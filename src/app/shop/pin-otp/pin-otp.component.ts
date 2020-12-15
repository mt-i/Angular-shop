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
      console.log(this.payload);
      this.payApi.update(this.payload).subscribe(data => {
        console.log(data);
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
      this.payload = {
        otp: this.userInput.value,
        txRef: 'xx-xxxxxxxxxx',
        flwRef: this.flowRef,
      };
      this.payApi.validate(this.payload).subscribe(data => {
        // Verify payment
        console.log('validated');
      }, err => {
        this.toast.showError('something happened trying to validate pay, retry card', 'validation Error');
        this.router.navigate(['/payments']);
      });
    }
  }

}
