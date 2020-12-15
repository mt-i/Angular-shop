import { SlugifyPipe } from './_services/pipes/slugify';
import { CartComponent } from './shop/cart/cart.component';
import { Storage } from 'angular-storage';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AppRoutingModule, PageRoutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './shared/nav/nav.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SearchComponent } from './shop/search/search.component';
import { BillingInfoComponent } from './shop/billing-info/billing-info.component';
import { AddBillingInfoComponent } from './shop/add-billing-info/add-billing-info.component';
import { PinOtpComponent } from './shop/pin-otp/pin-otp.component';
import { NumbersOnlyDirective } from './_services/numbers-only.directive';
import { LoaderComponent } from './shared/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AuthenticationComponent,
    FooterComponent,
    AboutComponent,
    ServicesComponent,
    PageRoutes,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    SearchComponent,
    BillingInfoComponent,
    AddBillingInfoComponent,
    PinOtpComponent,
    NumbersOnlyDirective,
    LoaderComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrftoken',
      headerName: 'X-CSRFToken' }
    ),
    FormsModule,
    // FormBuilder,
    // FormGroup,
    // Validators,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    CartComponent,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    SlugifyPipe,
    SearchComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
