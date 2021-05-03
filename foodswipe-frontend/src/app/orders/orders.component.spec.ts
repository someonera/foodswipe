import { render } from '@testing-library/angular'

import { createMockWithValues } from '@testing-library/angular/jest-utils';
import { BehaviorSubject, Observable } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Order } from '../checkout/order.interface';

import {OrdersService} from './orders.service'
import { OrdersComponent } from './orders.component';

const openOrders$ = new BehaviorSubject<Order[]>([])
const pendingOrders$ = new BehaviorSubject<Order[]>([])

describe('OrdersComponent', () => {

test('should render', async () => {

  const ordersService = createMockWithValues(OrdersService, {openOrders$: openOrders$, pendingOrders$: pendingOrders$.asObservable()})

  await render(OrdersComponent, {
    imports: [RouterTestingModule],
    providers: [
      {provide: OrdersService,
      useValue: ordersService}
    ]
  })

  expect(OrdersComponent).toBeTruthy();
})

})