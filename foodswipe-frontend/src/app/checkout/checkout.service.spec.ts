import { CheckoutService } from './checkout.service';
import { MealsService } from '../meals/meals.service'

describe('CheckoutService', () => {
  let checkoutService: CheckoutService;
  let httpClientSpy: any
  let mealsService: MealsService

  beforeEach(() => {
    httpClientSpy = jest.fn(()=> ({post: jest.fn()}))
    checkoutService = new CheckoutService(mealsService, httpClientSpy)
  });

  it('should be created', () => {
    expect(checkoutService).toBeTruthy();
  });
});
