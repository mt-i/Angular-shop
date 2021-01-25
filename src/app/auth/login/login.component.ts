import { ShopService } from './../../_services/shop.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CartComponent } from '../../shop/cart/cart.component';
import { RestservicesService } from '../../restservices.service';
import { ToastService } from './../../toast.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  constructor(
    private restApi: RestservicesService,
    private cart: CartComponent,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastService,
    private shopService: ShopService,
    private metaTagService: Meta,
    private  title: Title
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [ Validators.required, Validators.email]],
      password: ['', [ Validators.required]]
    });
    this.title.setTitle('Sign In | Mocca-med');
    this.metaTagService.updateTag(
      { name: 'description', content: 'Login to continue buying medication from mocca-med online store' }
    );

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/pharmacy';

  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit(): void {

    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    // use the rest service here.
    const auth = {
      email: this.f.email.value,
      password: this.f.password.value
    };

    this.restApi.login(auth)
    .subscribe(res => {
      localStorage.setItem('token', res.key);

      if (res.status === 400 ){
        this.toast.showError('Oops', 'Something went wrong, cant use credentials');
      }

      if (res.status === 403){
        this.toast.showError('Oops', 'Something went wrong during login');
      }

      if (res.status === 200){
        this.cart.fetchUpdatedCart();
        this.router.navigate([this.returnUrl]);
        this.toast.showSuccess('Great', 'login Successful');
        this.getUser();
        this.getUserCart();
      }
      
      console.log(res.status);
    }, err => {
      console.log(err);
      this.toast.showError('Oops', 'Something went wrong during login');
      this.loading = false;
    });
  }

  getUser(): void {
    this.restApi.user().subscribe(data => {
      localStorage.setItem('userId', data[0].id);
    });
  }

  getUserCart(): void {
    this.shopService.observeCart().subscribe( data => {
      localStorage.setItem('userId', data.id);
    });
  }

}
