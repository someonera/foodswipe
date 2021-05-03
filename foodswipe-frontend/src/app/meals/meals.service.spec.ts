import { MealsService } from './meals.service';
import { createMock } from '@testing-library/angular/jest-utils';

describe('MealsService', () => {

  const mealsService = createMock(MealsService)

  test('should be created', () => {
    expect(mealsService).toBeTruthy();
  });
});
