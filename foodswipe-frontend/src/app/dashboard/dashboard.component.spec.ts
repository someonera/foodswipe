import { render } from '@testing-library/angular'
import { DashboardComponent } from './dashboard.component';
import { createMock } from '@testing-library/angular/jest-utils';
import { RouterTestingModule } from '@angular/router/testing';


import { AuthService } from '../login/auth.service';
import { MealsService } from '../meals/meals.service';

describe('DashboardComponent', () => {


  test('should render', async () => {

    const authService = createMock(AuthService);
    authService.login = jest.fn();

    const mealsService = createMock(MealsService);
    mealsService.getNextMeal = jest.fn()
    mealsService.getMealById = jest.fn()
    mealsService.createMeal = jest.fn()
    mealsService.getRestaurantMeals = jest.fn()
    mealsService.updateMeal = jest.fn()



    await render(DashboardComponent, {
      imports: [RouterTestingModule],
      componentProviders: [
        {provide: MealsService,
        useValue: authService},
        {provide: AuthService,
        useValue: mealsService
      }]
    })
    expect(DashboardComponent).toBeTruthy();
  });
});


//Adding the module RouterTestingModule.withRoutes([]) to the spec class solved my issue.

