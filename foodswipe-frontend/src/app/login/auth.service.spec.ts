import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let httpClientSpy: any

  beforeEach(() => {
    httpClientSpy = jest.fn(() => ({ post: jest.fn()}))
    authService = new AuthService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });
});
