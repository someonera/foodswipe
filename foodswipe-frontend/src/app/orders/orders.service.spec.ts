import { createMock } from '@testing-library/angular/jest-utils';
import { OrdersService } from './orders.service';

describe('OrdersService', () => {

  const ordersService = createMock(OrdersService)

  it('should be created', () => {
    expect(ordersService).toBeTruthy();
  });
});
