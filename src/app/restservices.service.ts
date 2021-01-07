import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://www.khonis.co.za/';


@Injectable({
  providedIn: 'root'
})
export class RestservicesService {
  isLoggedIn = false;
  redirectUrl: string;

  constructor(private http: HttpClient) { }

  login(logins): Observable<any> {
    const url = apiUrl + 'rest-auth/login/';
    return this.http.post(url, logins, httpOptions).pipe(
      tap(_ =>
        this.isLoggedIn = true
        ),
        catchError(this.handleError('login', []))
    );
  }

  register(accountInfo): Observable<any> {
    const url = apiUrl + 'rest-auth/registration/';
    return this.http.post(url, accountInfo, httpOptions).pipe(
      tap(_ => this.isLoggedIn = true),
      catchError(this.handleError('register', []))
    );
  }

  user(): Observable<any> {
    return this.http.get(apiUrl + 'apis/user/', httpOptions).pipe(
      tap(_ => console.log('got user'))
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
