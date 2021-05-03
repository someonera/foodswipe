import { render } from '@testing-library/angular'


import { createMockWithValues } from '@testing-library/angular/jest-utils';
import { MealsService } from '../meals/meals.service';
import { BehaviorSubject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Meal } from '../meals/meal.interface';

import { MealsComponent } from './meals.component';

const meal$ = new BehaviorSubject<Meal>({} as Meal)

describe('MealsComponent', () => {

  test('should render', async () => {
    const mealsService = createMockWithValues(MealsService, {meal$: meal$})

    await render(MealsComponent, {
      imports: [RouterTestingModule],
      providers: [
        {provide: MealsService,
        useValue: mealsService}
      ]
    })
    expect(MealsComponent).toBeTruthy()
  })
});
