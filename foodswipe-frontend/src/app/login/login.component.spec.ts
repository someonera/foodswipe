import { render } from '@testing-library/angular'
import { createMockWithValues } from '@testing-library/angular/jest-utils';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';
import { Restaurant } from '../login/restaurant.interface'
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';

const restaurant$ = new BehaviorSubject<Restaurant>({} as Restaurant)

describe('LoginComponent', () => {

  test('should render', async () => {

    const authService = createMockWithValues(AuthService, {restaurant$: restaurant$})

    await render(LoginComponent, {
      imports: [RouterTestingModule, ReactiveFormsModule],
      providers: [
        {provide: AuthService,
        useValue: authService}
      ]
    })

    expect(LoginComponent).toBeTruthy()
  })

});
