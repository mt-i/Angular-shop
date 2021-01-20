import { ToastService } from './../../toast.service';
import { Component, OnInit } from '@angular/core';
import { ShopService } from './../../_services/shop.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { NavComponent } from 'src/app/shared/nav/nav.component';
import { Meta, Title } from '@angular/platform-browser';

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
    private nav: NavComponent,
    private title: Title,
    private metaTagService: Meta
    // public store: Storage,
  ) {
      this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          const result = this.router.getCurrentNavigation().extras.state.product;
          this.sharedData = result[0];
        }
        else {
          const productId = this.route.snapshot.params.id;
          this.shopService.productDetails(productId).subscribe(data => {
            this.sharedData = data;
          });
        }
        });
      
      this.title.setTitle( this.sharedData.name + ' | Mocca-med');
      this.metaTagService.updateTag(
        { name: 'description', content: 'Buy |' + this.sharedData.discription}
      );

    }

  ngOnInit(): void {
  }

  addItemToCart(productName: any): void {
    let products = JSON.parse(localStorage.getItem('cart-items'));
    console.log(products);
    if (products != null){
      products.push(productName);
    }
    else {
      products = [];
      products.push(productName);
    }
    localStorage.setItem('cart-items', JSON.stringify(products));
    this.nav.cartItems = products.length;
    const cartId = localStorage.getItem('cart-id');
    this.shopService.addToCart({'products': products}, cartId).then(res => {
      console.log(res);
      // this.store.set('cart', { products: products});
      this.toast.showSuccess('Great', 'item added to cart');
    }, err => {
      this.toast.showError('Oops', 'Something went wrong try again, if this persist relax we are solving the issue');
    });
  }


}
