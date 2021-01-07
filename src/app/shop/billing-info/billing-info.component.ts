import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Toast } from 'ngx-toastr';
import { ToastService } from 'src/app/toast.service';
import { ShopService } from 'src/app/_services/shop.service';

@Component({
  selector: 'app-billing-info',
  templateUrl: './billing-info.component.html',
  styleUrls: ['./billing-info.component.css']
})
export class BillingInfoComponent implements OnInit {
  form : FormGroup
  returnUrl: any;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private shopService: ShopService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [ Validators.required]],
      address: ['', [ Validators.required]],
  });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/pharmacy';

  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }
  

  onSubmit(): void {
    this.submitted = true;
    const user = JSON.parse(localStorage.getItem('cart')).user;
    console.log(user)
    const payload = {
      name: this.f.name.value,
      address: this.f.address.value,
      lat: 0.0,
      lng: 0.0,
      user: user
    };

    this.shopService.addLocation(payload).subscribe(data => {
      this.toast.showSuccess('great','you updated address');
      localStorage.setItem('location',JSON.stringify(data));
      this.router.navigate(['/cart']);
    })
  }

}
