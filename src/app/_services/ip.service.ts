import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://api.ipify.org/?format=json';

@Injectable({
  providedIn: 'root'
})
export class IpService {

  constructor(
    private http: HttpClient,
  ) { }

  ip(): Observable<any> {
    return this.http.get(apiUrl).pipe(
      tap(_ => console.log('got ip'))
    );
  }
}
