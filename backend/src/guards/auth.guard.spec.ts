import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let jwtService: JwtService;

  beforeEach(() => {
    jwtService = {
      verifyAsync: jest.fn(),
    } as any;

    authGuard = new AuthGuard(jwtService);
  });

  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });

  it('should throw UnauthorizedException if no token is provided', async () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {},
        }),
      }),
    } as any;
    await expect(authGuard.canActivate(context)).rejects.toThrowError(UnauthorizedException);
  });

  it('should return true if token is valid', async () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: 'Bearer valid_token',
          },
        }),
      }),
    } as any;

    jwtService.verifyAsync = jest.fn().mockResolvedValue({ userId: 1 });

    const result = await authGuard.canActivate(context);
    expect(result).toBe(true);
  });
});