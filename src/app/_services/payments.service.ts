import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://www.khonis.co.za/payments/';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(
    private http: HttpClient,
  ) { }

  charge(payload: any): Observable<any> {
    return this.http.post(`${apiUrl}charge/`, payload, httpOptions).pipe(
      tap(_ => console.log('payment charge attempt...')),
      catchError(this.handleError('charge', []))
    );
  }

  update(payload: any): Observable<any> {
    return this.http.post(`${apiUrl}update/`, payload, httpOptions).pipe(
      tap(_ => console.log('updating payload ...')),
      catchError(this.handleError('update', []))
    );
  }

  validate(payload: any): Observable<any> {
    return this.http.post(`${apiUrl}validate/`, payload, httpOptions).pipe(
      tap(_ => console.log('validate sent')),
      catchError(this.handleError('validate', []))
    );
  }

  verify(payload: any): Observable<any> {
    return this.http.post(`${apiUrl}verify/`, payload, httpOptions).pipe(
      tap(_ => console.log('verify attempt')),
      catchError(this.handleError('verify', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
