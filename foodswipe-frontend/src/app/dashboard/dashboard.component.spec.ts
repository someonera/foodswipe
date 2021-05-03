import { render } from '@testing-library/angular'
import { DashboardComponent } from './dashboard.component';
import { createMockWithValues } from '@testing-library/angular/jest-utils';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { Meal } from '../meals/meal.interface';
import { Restaurant } from '../login/restaurant.interface'

import { AuthService } from '../login/auth.service';
import { MealsService } from '../meals/meals.service';

const mealList$ = new BehaviorSubject<Meal[]>([])
const restaurant$ = new BehaviorSubject<Restaurant>({} as Restaurant)

describe('DashboardComponent', () => {
  test('should render', async () => {
    const mealsService = createMockWithValues(MealsService, {mealList$: mealList$})
    const authService = createMockWithValues(AuthService, {restaurant$: restaurant$})
    await render(DashboardComponent, {
      imports: [RouterTestingModule],
      providers: [{
        provide: MealsService,
        useValue: mealsService
      },
        {
        provide: AuthService,
        useValue: authService
      }]
    })
    expect(DashboardComponent).toBeTruthy();
  });
})
