import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    signUp: jest.fn(),
    signIn: jest.fn(),
    recovery: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => jest.clearAllMocks());

  // ============================
  // signup
  // ============================
  it('should call authService.signUp and return correct response', () => {
    const dto = { login: 'test', password: '123' };
    const expectedServiceResponse = { id: 1, login: dto.login };

    mockAuthService.signUp.mockReturnValue(expectedServiceResponse);

    const result = controller.signUp(dto);

    expect(service.signUp).toHaveBeenCalledWith(dto);
    expect(result).toEqual({
      message: "Пользователь зарегистрирован",
      errCode: 0,
      data: expectedServiceResponse,
    });
  });

  // ============================
  // signin
  // ============================
  it('should call authService.signIn and return correct response', () => {
    const dto = { login: 'user', password: 'pass' };
    const expectedServiceResponse = { token: 'jwt-token' };

    mockAuthService.signIn.mockReturnValue(expectedServiceResponse);

    const result = controller.signIn(dto);

    expect(service.signIn).toHaveBeenCalledWith(dto);
    expect(result).toEqual({
      message: "Пользователь аутентифицирован",
      errCode: 0,
      data: expectedServiceResponse,
    });
  });

  // ============================
  // recovery
  // ============================
  it('should call authService.recovery and return correct response', () => {
    const token = 'recovery-token';
    const expectedServiceResponse = { ok: true };

    mockAuthService.recovery.mockReturnValue(expectedServiceResponse);

    const result = controller.recovery(token);

    expect(service.recovery).toHaveBeenCalledWith(token);
    expect(result).toEqual({
      message: "Пароль восстановлен",
      errCode: 0,
      data: expectedServiceResponse,
    });
  });
});
