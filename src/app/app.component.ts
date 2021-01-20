import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Mocca-med';

  constructor(
    private metaTagService: Meta,
  ){
    
  }

  ngOnInit(){
    this.metaTagService.addTags(
      [
        {name: 'keywords', content: 'medical store, mocca-med, pharmacy, buy meds, pills, meds'},
        {name: 'Author', content: 'Gundo Prosper'},
        {name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
        {charset: 'utf-8'}
      ]
    );
  }

  
}
