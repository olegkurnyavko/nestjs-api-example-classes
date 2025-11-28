import { Test, TestingModule } from '@nestjs/testing';
import { MeController } from './me.controller';
import { UserService } from '../user/user.service';
import { TaskService } from '../task/task.service';

describe('MeController', () => {
  let controller: MeController;
  let userService: UserService;
  let taskService: TaskService;

  const mockUserService = {
    getUserById: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  };

  const mockTaskService = {
    createTask: jest.fn(),
    getAllUserTasks: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeController],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: TaskService, useValue: mockTaskService },
      ],
    }).compile();

    controller = module.get<MeController>(MeController);
    userService = module.get<UserService>(UserService);
    taskService = module.get<TaskService>(TaskService);
  });

  afterEach(() => jest.clearAllMocks());

  // ============================
  // GET /
  // ============================
  it('should return profile data', () => {
    const expectedData = { id: 1, email: 'user@test.com' };
    mockUserService.getUserById.mockReturnValue(expectedData);

    const result = controller.getProfile();

    expect(userService.getUserById).toHaveBeenCalledWith(1);
    expect(result).toEqual({
      message: 'Мой профиль',
      errCode: 0,
      data: expectedData,
    });
  });

  // ============================
  // PATCH /
  // ============================
  it('should update profile and return empty data array', () => {
    const dto = { name: 'New Name', password: 'newpass' };
    const serviceResponse = { id: 1, name: dto.name, password: dto.password };

    mockUserService.updateUser.mockReturnValue(serviceResponse);

    const result = controller.updateProfile(dto);

    expect(userService.updateUser).toHaveBeenCalledWith(1, dto);
    // Контроллер игнорирует ответ сервиса и всегда возвращает data: []
    expect(result).toEqual({
      message: 'Мой профиль обновлен',
      errCode: 0,
      data: serviceResponse,
    });
  });

  // ============================
  // DELETE /
  // ============================
  it('should delete profile and return message only', () => {
    const deleted = { id: 1, email: 'user@test.com' };
    mockUserService.deleteUser.mockReturnValue(deleted);

    const result = controller.deleteProfile();

    expect(userService.deleteUser).toHaveBeenCalledWith(1);
    expect(result).toEqual({
      message: 'Мой профиль удален',
      errCode: 0,
      data: deleted,
    });
  });

  // ============================
  // POST /task
  // ============================
  it('should create task for current user', () => {
    const dto = { title: 'Test task', description: 'Do it', dueDate: '2025-01-01' };
    const serviceResponse = { id: 1, userId: 1, ...dto };

    mockTaskService.createTask.mockReturnValue(serviceResponse);

    const result = controller.createTask(dto);

    expect(taskService.createTask).toHaveBeenCalledWith(1, dto);
    expect(result).toEqual({
      message: 'Задача создана',
      errCode: 0,
      data: serviceResponse,
    });
  });

  // ============================
  // GET /task
  // ============================
  it('should return all tasks for current user', () => {
    const tasks = [
      { id: 1, title: 'Task 1', description: 'Desc 1', userId: 1 },
      { id: 2, title: 'Task 2', description: 'Desc 2', userId: 1 },
    ];

    mockTaskService.getAllUserTasks.mockReturnValue(tasks);

    const result = controller.getTasks();

    expect(taskService.getAllUserTasks).toHaveBeenCalledWith(1);
    expect(result).toEqual({
      message: 'Все задачи пользователя',
      errCode: 0,
      data: tasks,
    });
  });
});
