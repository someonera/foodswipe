import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from '../checkout/order.interface';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {

  openOrders: Order[] = [];

  pendingOrders: Order[] = [];

  openOrderSubscription?: Subscription;
  pendingOrderSubscription?: Subscription;

  constructor(
    private ordersService: OrdersService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.openOrderSubscription = this.ordersService.openOrders$
      .subscribe(openOrders => this.openOrders = openOrders);
    this.pendingOrderSubscription = this.ordersService.pendingOrders$
      .subscribe(pendingOrders => this.pendingOrders = pendingOrders);
    this.ordersService.getOpenOrders();
  }

  ngOnDestroy(): void {
    this.ordersService.stopService();
    this.pendingOrderSubscription?.unsubscribe();
    this.openOrderSubscription?.unsubscribe();
  }

  handleAccept(id: number | undefined ): void {
    if(!id) return;
    this.ordersService.acceptOrder(id);
  }

  handleDelivered(id: number | undefined): void {
    if(!id) return;
    this.ordersService.orderDeliver(id);
  }

  handleStopService(): void {
    this.ordersService.stopService();
    this.router.navigate(['/dashboard']);
  }

}
