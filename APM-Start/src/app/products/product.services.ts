import { Injectable } from '@angular/core';
import { IProduct } from './product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

// This injection can be per root or per component.
// If root, the services is available in all compments.
// If specified component it is available only for this compment and it's nested components.
@Injectable({
    providedIn: 'root'
})
export class ProductService {
    // sending the HTTP request.
    private productUrl = 'api/products/products.json';
    // Inject dependancy. private variable(http): service instance
    constructor(private http: HttpClient) {}

    // Http request returns an observable
    // <IProduct[]> - generic paramter, beacuse the Observalbe is an array
    getProducts(): Observable<IProduct[]> {
        // .pipe is method to compose multiple observalbe operatos
        return this.http.get<IProduct[]>(this.productUrl)
        .pipe(
          // adding exeption handling. Here we have 2 operators.
          tap(data => console.log('All: ' + JSON.stringify(data))), // log data in console
          catchError(this.handleError) // calling error hangling method
        );
    }
    // error hangling method
    private handleError(err: HttpErrorResponse) {
      let errorMessage = '';
      if (err.error instanceof ErrorEvent) {
        errorMessage = `An error occured: ${err.error.message}`;
      } else {
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
    }
}