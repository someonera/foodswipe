import { render } from '@testing-library/angular'
import { DashboardComponent } from './dashboard.component';
import { createMock } from '@testing-library/angular/jest-utils';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Meal } from '../meals/meal.interface';
import { Restaurant } from '../login/restaurant.interface'


import { AuthService } from '../login/auth.service';
import { MealsService } from '../meals/meals.service';

describe('DashboardComponent', () => {
  // let mealsHttpClientSpy: any
  // let authHttpClientSpy: any
  // const meal = {
  //   id: 1,
  //   name: 'Chese on Toast',
  //   description: 'Is some cheese on some toast',
  //   price: 4.99,
  //   image_url: 'https://placeimg.com/640/480',
  //   restaurantId: 1
  // }
    const mockMealListService = new BehaviorSubject<Meal[]>([])
    const mockRestaurantService = new BehaviorSubject<Restaurant>({} as Restaurant)

    // beforeEach(() => {
    //   mealsHttpClientSpy = jest.fn(() => ({post: jest.fn(), get: jest.fn(() => meal), patch: jest.fn()}))
    //   authHttpClientSpy = jest.fn(() => ({ post: jest.fn()}))
    // })
  test('should render', async () => {

    const authService = createMock(AuthService);
    authService.login = jest.fn();
    authService.restaurant$ = mockRestaurantService

    const mealsService = createMock(MealsService);
    mealsService.getNextMeal = jest.fn()
    mealsService.getMealById = jest.fn()
    mealsService.createMeal = jest.fn()
    mealsService.getRestaurantMeals = jest.fn()
    mealsService.updateMeal = jest.fn()
    mealsService.mealList$ = mockMealListService

    mockMealListService.subscribe(res => console.log(res))
    mockRestaurantService.subscribe(res => console.log(res))

    await render(DashboardComponent, {
      imports: [RouterTestingModule],
      componentProviders: [{
          provide: MealsService,
        useValue: mealsService
        // new MealsService(mealsHttpClientSpy)
      },
        {
          provide: AuthService,
        useValue: authService
        // new AuthService(authHttpClientSpy)
      }]
    })
    expect(DashboardComponent).toBeTruthy();
    mockMealListService.next([])
    mockRestaurantService.next({} as Restaurant)
  });
})


//Adding the module RouterTestingModule.withRoutes([]) to the spec class solved my issue.

