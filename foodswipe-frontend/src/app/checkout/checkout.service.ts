import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MealsService } from '../meals/meals.service';
import { OrderResult } from './order-result.interface';
import { Order } from './order.interface';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private baseUrl = 'http://localhost:8080/orders/';

  private httpOptions = {
    headers: { 'Content-Type' : 'application/json '}
  };

  constructor(
    private mealsService: MealsService,
    private http: HttpClient,
  ) {}

  placeOrder(order: Order): void {
    console.log(order);
    const postResult = this.http.post<OrderResult>(
      this.baseUrl,
      order,
      this.httpOptions,
    )
      .pipe(
        tap((result) => console.log(result)),
        catchError(() => this.handleError<any>('post order')),
      );
    postResult.subscribe((r) => console.log(r));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
