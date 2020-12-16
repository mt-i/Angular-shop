import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://www.khonis.co.za/apis';
const apiv2 = 'http://www.khonis.co.za/api/v2';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(
    private http: HttpClient,
  ) { }

  // Remember the trailing slash, API doesnt resolve
  products(): Observable<any> {
    return this.http.get(apiUrl + '/open-products/?app_name=mocca-med', httpOptions).pipe(
      tap(_ => console.log('fetch products'))
    );
  }

  productDetails(productID): Observable<any> {
    return this.http.get(apiUrl + '/open-products/' + productID + '/', httpOptions).pipe(
      tap(_ => console.log('detailed'))
    );
  }

  search(q: string, filters: object): Observable<any>{
    return this.http.get(`${apiUrl}/open-products/?app_name=mocca-med&search=${q}`, httpOptions).pipe(
      tap(_ => console.log('search complete'))
    );
  }

  addOrder(payload: any): Observable<any>{
    return this.http.post(`${apiUrl}/user-orders/${q}`, httpOptions).pipe(
      tap(_ => console.log('search complete'))
    );
  }


  getCart() {
    return new Promise( resolve => {
      this.http.get(apiv2 + '/cart/?format=json').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  addToCart(patchData: any, cartId: any) {
    return new Promise(resolve => {
      this.http.patch(apiv2 + '/safe-ucart/' + cartId + '/?format=json', patchData, httpOptions).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

}
