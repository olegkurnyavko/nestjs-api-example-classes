import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  // ============================
  // TEST: signUp
  // ============================
  it('should return correct response for signUp', () => {
    const dto: SignUpDto = { login: 'test', password: '123' };

    const result = service.signUp(dto);

    expect(result).toEqual(dto);
  });

  // ============================
  // TEST: signIn
  // ============================
  it('should return correct response for signIn', () => {
    const dto: SignInDto = { login: 'user', password: 'pass' };

    const result = service.signIn(dto);

    expect(result).toEqual('jwt-token');
  });

  // ============================
  // TEST: recovery
  // ============================
  it('should return correct response for recovery', () => {
    const token = 'recovery-token';

    const result = service.recovery(token);

    expect(result).toEqual('ok');
  });
});
