import { ShopService } from './../../_services/shop.service';
import { Component, OnInit } from '@angular/core';
import { ToastService } from './../../toast.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart = { name: 'McDonalds Burgers'};
  cartData = {
    id: 1,
    products: [
        3
    ],
    user: 1,
    total: '0',
    subtotal: '0',
    updated: '2020-01-03T13:15:40.903233Z'
  };

  products = [];

  constructor(
    private rest: ShopService,
    public toast: ToastService,
    private router: Router) {
    this.fetchUpdatedCart();
   }

  ngOnInit() {
    this.fetchUpdatedCart();
  }


  async fetchUpdatedCart(){
    await this.rest.getCart().then(data => {
      this.cartData = data[0];
      this.products = data[0].products;
      localStorage.setItem('cart', JSON.stringify(this.cartData));
      localStorage.setItem('cart-products', JSON.stringify(this.products));
      localStorage.setItem('cart-id', this.cartData.id.toString());
      console.log(data[0].products);
    });
  }

  // make order request and link proceed to payments
  placeOrder(){
    this.toast.showSuccess('placing order', 'your order is been requested');
    this.router.navigateByUrl('/track-order');
  }
}
