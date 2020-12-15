import { IpService } from './../../_services/ip.service';
import { PaymentsService } from './../../_services/payments.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { RestservicesService } from 'src/app/restservices.service';
import { ToastService } from 'src/app/toast.service';
import { CartComponent } from '../cart/cart.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  ip = '127.0.0.1';
  constructor(
    private restApi: RestservicesService,
    private cart: CartComponent,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastService,
    private cd: ChangeDetectorRef,
    private payApi: PaymentsService,
    private ipApi: IpService,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      cardNo: ['', [Validators.required, Validators.pattern('^[ 0-9]*$'), Validators.minLength(17)]],
      cvv: ['', [Validators.required]],
      expiryDate: ['', [Validators.required]],
  });

    this.ipApi.ip().subscribe( data => {
      this.ip = data.ip;
    });

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit(): void{
    // get cart total
    const cart = JSON.parse(localStorage.getItem('cart'));
    const cartTotal = cart.total;

    // Get UserEmail, user phonenumber, firstname, lastname
    const uEmail = 'fff@example.com';
    const phoneNumber = '066666';
    const firstName = 'firstname';
    const lastName = 'lastname';

    // get card number,cvv, expiryDate
    const payload = {
      cardno: this.f.cardNo.value,
      cvv: this.f.cvv.value,
      currency: 'ZAR',
      country: 'ZA',
      expirymonth: this.f.expiryDate.value[0] + this.f.expiryDate.value[1],
      expiryyear: this.f.expiryDate.value[2] + this.f.expiryDate.value[3],
      amount: cartTotal,
      email: uEmail,
      phonenumber: phoneNumber,
      firstname: firstName,
      lastname: lastName,
      IP: this.ip,
    };
    this.submitted = true;
    console.log(payload);
    localStorage.setItem('payload', JSON.stringify(payload));

    // consume service
    this.payApi.charge(payload).subscribe(
      data => {
        console.log(data);
        if (data.status === 0){
          const navigationExtras: NavigationExtras = {
            state: {
              value: 'pin'
            }
          };
          this.toast.showInfo('PIN', 'Your card requires your pin');
          this.router.navigate(['/pin'], navigationExtras);
        }
        if (data.status === 1){
          // check if user have already added billing info
          this.toast.showInfo('Add billing', 'You havent added billing Address');
          this.router.navigate(['/billing-info']);
        }
        if (data.status === 2){
          const navigationExtras: NavigationExtras = {
            state: {
              value: 'otp'
            }
          };
          this.toast.showInfo('OTP', 'Validate payment check your sms/email for otp');
          this.router.navigate(['/pin'], navigationExtras);
        }
      }, err => {
        console.log(err);
        this.toast.showError('Something happened, try again - verify details', 'Oops');
      });

  }

  onChange(event) {
    this.cd.detectChanges();
  }

}
