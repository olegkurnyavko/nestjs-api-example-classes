import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  // ============================
  // getAllUsers
  // ============================
  it('should return all users', () => {
    const result = service.getAllUsers();

    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      id: 1,
      name: 'Jane Smith',
      email: 'jane@domain.com',
    });
  });

  // ============================
  // getUserById
  // ============================
  it('should return user by id', () => {
    const id = 5;
    const result = service.getUserById(id);

    expect(result).toEqual({
      id,
      email: 'jane@domain.com',
    });
  });

  // ============================
  // createUser
  // ============================
  it('should create user with login and password', () => {
    const login = 'newuser';
    const password = '12345';
    const dto = {login, password}

    const result = service.createUser(dto);

    expect(result).toEqual({ login, password });
  });

  // ============================
  // authenticateUser
  // ============================
  it('should authenticate user and return jwt token', () => {
    const login = 'user';
    const password = 'pass';
    const dto = {login, password}

    const result = service.authenticateUser(dto);

    expect(result).toBe('jwt-token');
  });

  // ============================
  // updateUser
  // ============================
  it('should update user', () => {
    const id = 10;
    const name = 'Updated Name';
    const password = 'newpass';
    const dto = { name, password }


    const result = service.updateUser(id, dto);

    expect(result).toEqual({
      id,
      name,
      password,
    });
  });

  // ============================
  // deleteUser
  // ============================
  it('should delete user and return deleted user data', () => {
    const id = 7;

    const result = service.deleteUser(id);

    expect(result).toEqual({
      id,
      email: 'jane@domain.com',
    });
  });
});
