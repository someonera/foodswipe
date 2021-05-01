

import { MealsService } from './meals.service';

describe('MealsService', () => {
  let mealsService: MealsService;
  let httpClientSpy: any

  beforeEach(() => {
    httpClientSpy = jest.fn(() => ({post: jest.fn(), get: jest.fn(), patch: jest.fn()}))
    mealsService = new MealsService(httpClientSpy)

  });

  it('should be created', () => {
    expect(mealsService).toBeTruthy();
  });
});
