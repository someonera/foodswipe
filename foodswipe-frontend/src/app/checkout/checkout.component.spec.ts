import { render } from '@testing-library/angular'
import { CheckoutComponent } from './checkout.component';
import { provideMock, createMockWithValues } from '@testing-library/angular/jest-utils';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

import { Meal } from '../meals/meal.interface';

import { MealsService } from '../meals/meals.service';
import { CheckoutService } from './checkout.service';

const meal$ = new BehaviorSubject<Meal>({} as Meal)

describe('CheckoutComponent', () => {

  test('should render', async () => {
    const mealsService = createMockWithValues(MealsService, {meal$: meal$})

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
    expect(CheckoutComponent).toBeTruthy();
  })

});
