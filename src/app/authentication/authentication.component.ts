import { CartComponent } from './../shop/cart/cart.component';
import { RestservicesService } from './../restservices.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  form: FormGroup;
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  constructor(
    private restApi: RestservicesService,
    private cart: CartComponent,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required]
  });

    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
      password2: ['', Validators.required],
  });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/shop';

  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }
  get rf() { return this.registerForm.controls; }

  onSubmit(){

    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    //use the rest service here.
    const auth = {
      email: this.f.email.value,
      password: this.f.password.value
    };

    this.restApi.login(auth)
    .subscribe(res => {
      localStorage.setItem('token', res.key);
      this.cart.fetchUpdatedCart();
      this.router.navigate([this.returnUrl]);
      console.log(res);
    }, err => {
      console.log(err);
      this.loading = false;
    });
  }

  onRegister(){

      this.submitted = true;

      // stop here if form is invalid
      if (this.form.invalid) {
        return;
      }

      this.loading = true;

      //use the rest service here.
      const auth = {
        username: this.rf.username.value,
        email: this.rf.email.value,
        password: this.rf.password.value
      };

      this.restApi.register(auth)
      .subscribe(res => {
        localStorage.setItem('token', res.key);
        this.cart.fetchUpdatedCart();
        this.router.navigate([this.returnUrl]);
        console.log(res);
      }, err => {
        console.log(err);
        this.loading = false;
      });
    }
}
