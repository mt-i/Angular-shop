import { Route } from '@angular/compiler/src/core';
import { ShopService } from '../../_services/shop.service';
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

   search(qString: string){
    this.restService.search(qString, this.filter).subscribe(
      data => {
        this.productsList = data;
      }
    );
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

}
