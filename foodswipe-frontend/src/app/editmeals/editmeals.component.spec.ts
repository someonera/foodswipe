import { render } from '@testing-library/angular'
import { BehaviorSubject } from 'rxjs';
import { provideMock, createMockWithValues } from '@testing-library/angular/jest-utils';
import { AngularFireStorage } from '@angular/fire/storage';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { EditMealsComponent } from './editmeals.component';
import { MealsService } from '../meals/meals.service';
import { AuthService } from '../login/auth.service';
import { Meal } from '../meals/meal.interface';
import { Restaurant } from '../login/restaurant.interface'


const meal$ = new BehaviorSubject<Meal>({} as Meal)
const restaurant$ = new BehaviorSubject<Restaurant>({} as Restaurant)

describe('EditmealsComponent', () => {
  const mealsService = createMockWithValues(MealsService, {meal$: meal$})
  const authService = createMockWithValues(AuthService, {restaurant$: restaurant$})

  test('should create', async () => {
    await render(EditMealsComponent, {
      imports: [RouterTestingModule, ReactiveFormsModule],
      providers: [
      {
        provide: MealsService,
        useValue: mealsService
      },
      {
        provide: AuthService,
        useValue: authService
      },
      provideMock(AngularFireStorage)
    ]
    })

    expect(EditMealsComponent).toBeTruthy();
  });
});
