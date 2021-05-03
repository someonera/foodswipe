import { render, screen } from '@testing-library/angular'
import userEvent from '@testing-library/user-event'
import { createMockWithValues } from '@testing-library/angular/jest-utils';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';
import { Restaurant } from '../login/restaurant.interface'
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import {Router} from '@angular/router'


describe('LoginComponent', () => {
  let authService: AuthService

  beforeEach( async () => {
    authService = createMockWithValues(AuthService, {restaurant$: new BehaviorSubject<Restaurant>({} as Restaurant)})
  })

  test('should render', async () => {
    await render(LoginComponent, {
      imports: [RouterTestingModule, ReactiveFormsModule],
      providers: [
        {provide: AuthService,
        useValue: authService}
      ]
    })
    expect(LoginComponent).toBeTruthy()
  })

  test('input correct details then navigate to user dashboard on pressing Login', async () => {
    authService.login = jest.fn(() => {
      authService.restaurant$.next({id: 1, name: 'Casa del Ro', email: 'test@email.com'})
    })

  let mockRouter = {
    navigate: jest.fn()
  }

  await render(LoginComponent, {
    imports: [RouterTestingModule, ReactiveFormsModule],
    providers: [
      {
        provide: AuthService,
        useValue: authService
      },
      {
        provide: Router,
        useValue: mockRouter
      }
    ]
  })

      const emailControl = screen.getByRole('textbox',{name: /email/i})
      const passwordControl = screen.getByLabelText(/password/i)

      userEvent.type(emailControl, 'test@email.com')
      userEvent.type(passwordControl, 'password')

      expect(emailControl).toHaveValue('test@email.com')
      expect(passwordControl).toHaveValue('password')

      const form = screen.getByRole('form')
      expect(form).toHaveFormValues({
        email: 'test@email.com',
        password: 'password'
      })

    await userEvent.click(screen.getByRole('button'))
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard'])
    expect(authService.login).toHaveBeenCalledWith( "test@email.com", "password")
  })

});
