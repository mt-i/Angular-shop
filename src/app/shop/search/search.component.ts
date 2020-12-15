import { ToastService } from './../../toast.service';
import { ShopService } from './../../_services/shop.service';
import { ProductDetailsComponent } from './../product-details/product-details.component';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  q = '';
  productList: any;
  productsList: any;
  slugifyPipe: any;
  filter: object;
  showing: 0;
  constructor(
    private restService: ShopService,
    private router: Router,
    private route: ActivatedRoute,
    private shopService: ShopService,
    private toast: ToastService,
      ) {
        this.route.queryParams.subscribe(params => {
          if (this.router.getCurrentNavigation().extras.state) {
            this.q = this.router.getCurrentNavigation().extras.state.q;
            console.log(this.q);
          }
        });
        this.search(this.q);
       }

  ngOnInit(): void {
  }

   search(qString: string): void{
    this.restService.search(qString, this.filter).subscribe(
      data => {
        this.productsList = data;
      }
    );
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
    this.shopService.addToCart({'products': products}, '1').then(res => {
      console.log(res);
      // this.store.set('cart', { products: products});
      this.toast.showSuccess('Great', 'item added to cart');
    }, err => {
      this.toast.showError('Oops', 'Something went wrong try again, if this persist relax we are solving the issue');
    });
  }

}
