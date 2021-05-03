import { AuthService } from './auth.service';
import { createMock } from '@testing-library/angular/jest-utils';

describe('AuthService', () => {
  const authService = createMock(AuthService)

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });
});
