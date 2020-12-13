import { SlugifyPipe } from './../../_services/pipes/slugify';
import { ShopService } from './../../_services/shop.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';


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

  products(){
    this.shopService.products().subscribe(
      data => {
        this.productsList = data;
        this.showing = this.productsList.length;
      });
  }

  goto(id: any, name: any) {
    const filteredProducts = this.productsList.filter(prod => prod.id === id);
    const navigationExtras: NavigationExtras = {
      state: {
        product: filteredProducts
      }
    };
    this.router.navigate(['product-details', id, this.slugifyPipe.transform(name)], navigationExtras);
  }

  gotoCart() {
    this.router.navigateByUrl('/cart');
  }
}
