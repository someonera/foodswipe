import '@testing-library/jest-dom'
import { async, TestBed } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular'
import userEvent from '@testing-library/user-event'
import { DashboardComponent } from './dashboard.component';
import { createMockWithValues } from '@testing-library/angular/jest-utils';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { Meal } from '../meals/meal.interface';
import { Restaurant } from '../login/restaurant.interface'
import { AuthService } from '../login/auth.service';
import { MealsService } from '../meals/meals.service';
import {Router} from '@angular/router'
import {OrdersComponent} from '../orders/orders.component';



describe('DashboardComponent', () => {
  let authService: AuthService
  let mealsService: MealsService

  beforeAll( async () => {
    mealsService = createMockWithValues(MealsService, {mealList$: new BehaviorSubject<Meal[]>([])})
    authService = createMockWithValues(AuthService, {restaurant$: new BehaviorSubject<Restaurant>({id: 1, name: 'Casa del Ro', email: 'test@email.com'} as Restaurant)})
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
  })

  test('should render', async () => {
    expect(DashboardComponent).toBeTruthy();
  });

  test('navigate to orders on pressing Start Service', async () => {
    expect(screen.getByRole('button', {name: /start service/i})).toHaveAttribute('ng-reflect-router-link','orders')
  })

  test('navigate to editmeal/new on pressing new meal', () => {
    expect(screen.getByRole('button', {name: /add meal/i})).toHaveAttribute('ng-reflect-router-link','editmeal,new')

  })


  test('navigate to editmeal/:id on pressing edit meal', async () => {

    mealsService = createMockWithValues(MealsService, {mealList$: new BehaviorSubject<Meal[]>([
      {id: 1, name: 'food', description: 'yum', price: 1.00, image_url: '', restaurant: {id: 1, name: 'Casa del Ro'}},
      {id: 2, name: 'more food', description: 'yum', price: 1.00, image_url: '', restaurant: {id: 1, name: 'Casa del Ro'}},
      {id: 3, name: 'even more food', description: 'yum', price: 1.00, image_url: '', restaurant: {id: 1, name: 'Casa del Ro'}}
    ])})

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
    const editMealBtns = screen.getAllByRole('button', {name: /edit meal/i})

    expect(editMealBtns[0]).toHaveAttribute('ng-reflect-router-link','editmeal,1')
    expect(editMealBtns[1]).toHaveAttribute('ng-reflect-router-link','editmeal,2')
    expect(editMealBtns[2]).toHaveAttribute('ng-reflect-router-link','editmeal,3')
    // expect(screen.getAllByRole('button', {name: /edit meal/i})).toHaveAttribute('ng-reflect-router-link','editmeal,')
  })

  test('should not have edit meal buttons when no meals', async () => {
    const buttonArray = (screen.queryAllByRole('button', {name: /edit meal/i}))
    expect(buttonArray.length === 0)
  })

})
