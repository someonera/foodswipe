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


  beforeEach( async () => {
    mealsService = createMockWithValues(MealsService, {mealList$: new BehaviorSubject<Meal[]>([])})
    authService = createMockWithValues(AuthService, {restaurant$: new BehaviorSubject<Restaurant>({id: 1, name: 'Casa del Ro', email: 'test@email.com'} as Restaurant)})
  })

  test('should render', async () => {
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

  test('navigate to orders on pressing Start Service', async () => {

    await render(DashboardComponent, {
      imports: [RouterTestingModule],
      providers: [
        {
          provide: MealsService,
          useValue: mealsService
        },
        {
          provide: AuthService,
          useValue: authService
        }
      ]
    })

    expect(screen.getByRole('button', {name: /start service/i})).toHaveAttribute('ng-reflect-router-link','orders')
    // expect(screen.getByRole('button', {name: /Menu/i})).toHaveAttribute('ng-reflect-router-link','orders')
    // expect(screen.getByRole('button', {name: /+/i})).toHaveAttribute('ng-reflect-router-link','orders')

  })

})
