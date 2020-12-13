import { ToastService } from './../../toast.service';
import { Component, OnInit } from '@angular/core';
import { RestservicesService } from '../../restservices.service';
import { CartComponent } from '../../shop/cart/cart.component';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
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
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
      password2: ['', Validators.required],
  });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/pharmacy';

  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }


  onRegister(){

      this.submitted = true;

      // stop here if form is invalid
      if (this.form.invalid) {
        return;
      }

      this.loading = true;

      // use the rest service here.
      const auth = {
        username: this.f.username.value,
        email: this.f.email.value,
        password: this.f.password.value
      };

      this.restApi.register(auth)
      .subscribe(res => {
        localStorage.setItem('token', res.key);
        this.cart.fetchUpdatedCart();
        this.toast.showSuccess('Great', 'Successfully registered');
        this.router.navigate([this.returnUrl]);
        console.log(res);
      }, err => {
        console.log(err);
        this.loading = false;
        this.toast.showError('Oops', 'Could not register');
      });
    }
}
