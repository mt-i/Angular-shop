import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { SearchComponent } from '../shop/search/search.component';

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
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private doSearch: SearchComponent,
  ) { }

  ngOnInit(): void {
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
