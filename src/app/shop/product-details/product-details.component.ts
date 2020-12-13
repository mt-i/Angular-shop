import { ToastService } from './../../toast.service';
import { Component, OnInit } from '@angular/core';
import { ShopService } from './../../_services/shop.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  sharedData = {
    id: 0,
    name: 'cant find product name',
    product_pic: 'http://localhost:8000/media/pic_folder/food1.jpg',
    user: 0,
    business: 0,
    price: 0,
    category: [
        0
    ],
    quantity: 1,
    discription: 2,
    color: 'black'
  };
  itemCount: any;

  constructor(
    public shopService: ShopService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastService,
    // public store: Storage,
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        const result = this.router.getCurrentNavigation().extras.state.product;
        this.sharedData = result[0];
      }
    });
  }

  ngOnInit(): void {
  }

  addItemToCart(productName: any) {
    const products = [];
    products.push(productName);
    this.shopService.addToCart({'products': products}, '1').then(res => {
      console.log(res);
      // this.store.set('cart', { products: products});
      this.toast.showSuccess('Great', 'item added to cart');
    }, err => {
      this.toast.showError('Oops', 'Something went wrong try again, if this persist relax we are solving the issue');
    });
  }


}
