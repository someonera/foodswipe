import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, timer } from 'rxjs';
import { retry, share, switchMap, takeUntil } from 'rxjs/operators';
import { Order } from '../checkout/order.interface';
import { AuthService } from '../login/auth.service';
import { Restaurant } from '../meals/restaurant.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private baseUrl = 'http://localhost:8080/orders?restaurantId='
  private stopPolling = new Subject();
  openOrders$ = new BehaviorSubject<Order[]>([]);

  // Polling mechanism
  pendingOrders$: Observable<Order[]>;
  restaurant: Restaurant;

  private httpOptions = {
    headers: { 'Content-Type' : 'application/json '}
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
    this.restaurant = this.authService.restaurant$.getValue();
    this.pendingOrders$ = timer(1, 3000).pipe(
      switchMap(() => this.getPendingOrders()), // Transforms timer to observable Order[]
      retry(), // ensures failed attempts do not cancel timer
      share(), // ensures all subs share the same timer
      takeUntil(this.stopPolling) // to destroy timer
    );
  }
  
  getOpenOrders(): void {
    const newOrders = this.http.get<Order[]>(`${this.baseUrl}${2}&status=ACCEPTED`);
    newOrders.subscribe(orders => this.openOrders$.next(orders));
    
  }

  private getPendingOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}${2}&status=PENDING`);
  }

  acceptOrder(id: number): void { // todo fix restaurant id
    this.http.patch<Order>(`${this.baseUrl}${2}&status=ACCEPTED&id=${id}`, null)
      .subscribe((orders) => {
        console.log(orders);
        this.getOpenOrders();
      });
  }

  orderDeliver(id: number): void {
    this.http.patch<Order>(`${this.baseUrl}${this.restaurant.id}&status=DELIVERED&id=${id}`, null)
      .subscribe(( _ ) => {
        this.getOpenOrders();
      });
  }

  stopService(): void {
    // prevent timer leaking
    this.stopPolling.next();
  }
}
