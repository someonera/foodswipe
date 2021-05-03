import { CheckoutService } from './checkout.service';
import { createMock } from '@testing-library/angular/jest-utils';


describe('CheckoutService', () => {
  const checkoutService = createMock(CheckoutService)

  it('should be created', () => {
    expect(checkoutService).toBeTruthy();
  });
});
