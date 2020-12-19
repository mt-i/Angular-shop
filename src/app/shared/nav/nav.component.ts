import { SearchComponent } from './../../shop/search/search.component';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  q = {
    search: ''
  };
  cartItems = 0;
  showing: 0;
  productId: any;
  cartItem: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private doSearch: SearchComponent,
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('cart-id') != null){
      this.cartItems = JSON.parse(localStorage.getItem('cart-products')).length;
    }
  }

  search(): void {
    const navigationExtras: NavigationExtras = {
      state: {
        q: this.q.search
      }
    };
    if (this.router.url === '/products'){
      this.doSearch.search(this.q.search);
    }
    this.router.navigate(['products/'], navigationExtras);
  }

}
