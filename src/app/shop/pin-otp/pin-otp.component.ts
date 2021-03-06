import { ShopService } from './../../_services/shop.service';
import { PaymentsService } from './../../_services/payments.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/toast.service';

@Component({
  selector: 'app-pin-otp',
  templateUrl: './pin-otp.component.html',
  styleUrls: ['./pin-otp.component.css']
})
export class PinOtpComponent implements OnInit {
  state: string;
  message: string;
  userInput = {value: ''};
  payload: any;
  flowRef = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastService,
    private payApi: PaymentsService,
    private shopService: ShopService,
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        const result = this.router.getCurrentNavigation().extras.state.value;
        this.state = result;
        this.message = 'Enter ' + this.state;
      }
    });
   }

  ngOnInit(): void {
  }

  onSubmit(): void{
    if ( this.state === 'pin'){
      this.payload = {
        pin: this.userInput.value,
        flw: 'Change this later',
        payload: JSON.parse(localStorage.getItem('payload')),
      };
      this.payApi.update(this.payload).subscribe(data => {
        if (data.results.validationRequired === true){
          this.toast.showInfo('OTP', 'Validate payment check your sms/email for otp');
          this.message = 'Enter OTP from your bank';
          this.userInput.value = '';
          this.state = 'otp';
          this.flowRef = data.results.flwRef;
        }
      }, err => {
        this.toast.showError('something happened trying to update pin, retry pin', 'validation Error');
      });
    }
    else {
      if (this.flowRef === ''){
        this.flowRef = localStorage.getItem('flwRef');
      }
      this.payload = {
        otp: this.userInput.value,
        txRef: 'xx-xxxxxxxxxx',
        flwRef: this.flowRef,
      };
      this.payApi.validate(this.payload).subscribe(data => {
        // Verify payment
        const cart = JSON.parse(localStorage.getItem('cart'));
        const newOrder = {
          name: 'mocca-med',
          customer: cart.user,
          meta: cart,
        };
        const verifyPayload = {
          txRef: data.txRef,
        };
        this.payApi.verify(verifyPayload).subscribe( results => {
          if (results.status === 3 || results.transactionComplete === true){
            this.shopService.addOrder(newOrder).subscribe( res => {
              this.toast.showSuccess('Successfully Paid', 'Track Order');
              this.router.navigate(['track']);
            });
          }
          else{
            this.toast.showError('Payment Verification Failed', 'PAYMENT ERROR');
          }
        });
      }, err => {
        this.toast.showError('something happened trying to validate pay, retry card', 'validation Error');
        this.router.navigate(['/payments']);
      });
    }
  }

}
