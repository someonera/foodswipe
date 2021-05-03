import { render } from '@testing-library/angular'
import { CheckoutComponent } from './checkout.component';
import { provideMock, createMockWithValues } from '@testing-library/angular/jest-utils';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

import { Meal } from '../meals/meal.interface';

import { MealsService } from '../meals/meals.service';
import { CheckoutService } from './checkout.service';

describe('CheckoutComponent', () => {
  beforeEach(async () => {
    const mealsService = createMockWithValues(MealsService, {meal$: new BehaviorSubject<Meal>({} as Meal)})
    await render(CheckoutComponent, {
      imports: [RouterTestingModule, ReactiveFormsModule],
      providers: [
        provideMock(CheckoutService),
      {
        provide: MealsService,
        useValue: mealsService
      }
    ]
    })
  })

  test('should render', async () => {
    expect(CheckoutComponent).toBeTruthy();
  })
});
