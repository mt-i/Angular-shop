import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { SearchComponent } from '../shop/search/search.component';
import { ShopService } from '../_services/shop.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  q = {
    search: ''
  };
  cartItems = 1;
  showing: 0;
  productId: any;
  cartItem: any;
  featuredProducts= [];
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private doSearch: SearchComponent,
    private shopService: ShopService,
    private title: Title,
    private metaTagService: Meta,
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Home | Mocca-med');
    this.metaTagService.updateTag(
      { name: 'description', content: 'Best Pharmacy and Online store, we care about your health' }
    );
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

  featured(): void {
    

    var qStrings = ["Dr lee Natural Spanish", "immuno health", "Seed oil","Ds 24"];
    qStrings.forEach(item => {
      this.shopService.search(item,{}).subscribe( data => {
        this.featuredProducts.push(data)
      })
    });
    
  }

}
