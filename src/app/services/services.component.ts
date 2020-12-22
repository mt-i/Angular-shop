import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { SlugifyPipe } from '../_services/pipes/slugify';
import { ShopService } from '../_services/shop.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  featuredProducts = [];

  constructor(
    private shopService: ShopService,
    private router: Router,
    private route: ActivatedRoute,
    private slugifyPipe: SlugifyPipe,
  ) { }

  ngOnInit(): void {
    this.featured();
  }

  featured(): void {
    var qStrings = ["Dr lee Natural Spanish", "immuno health", "Seed oil","Ds 24"];
    qStrings.forEach(item => {
      this.shopService.search(item,{}).subscribe( data => {
        this.featuredProducts.push(data[0]);
        console.log(this.featuredProducts)
      })
    });
    
  }

  goto(id: any, name: any): void {
    const filteredProducts = this.featuredProducts.filter(prod => prod.id === id);
    const navigationExtras: NavigationExtras = {
      state: {
        product: filteredProducts
      }
    };
    this.router.navigate(['product-details', id, this.slugifyPipe.transform(name)], navigationExtras);
  }

}
