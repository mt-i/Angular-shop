import { ToastService } from './../../toast.service';
import { SlugifyPipe } from './../../_services/pipes/slugify';
import { ShopService } from './../../_services/shop.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { NavComponent } from 'src/app/shared/nav/nav.component';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productsList: any;
  showing: 0;
  productId: any;
  cartItem: any;
  constructor(
    public shopService: ShopService,
    private router: Router,
    private route: ActivatedRoute,
    private slugifyPipe: SlugifyPipe,
    private toast: ToastService,
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.cartItem = this.router.getCurrentNavigation().extras.state.cartitems;
      }
    });
   }

  ngOnInit(): void {
    this.products();
  }

  products(): void {
    this.shopService.products().subscribe(
      data => {
        this.productsList = data;
        this.showing = this.productsList.length;
      });
  }

  goto(id: any, name: any): void {
    const filteredProducts = this.productsList.filter(prod => prod.id === id);
    const navigationExtras: NavigationExtras = {
      state: {
        product: filteredProducts
      }
    };
    this.router.navigate(['product-details', id, this.slugifyPipe.transform(name)], navigationExtras);
  }

  gotoCart(): void {
    this.router.navigateByUrl('/cart');
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
