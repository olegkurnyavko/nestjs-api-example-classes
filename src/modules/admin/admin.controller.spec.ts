import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { UserService } from '../user/user.service';
import { TaskService } from '../task/task.service';

describe('AdminController', () => {
  let controller: AdminController;
  let userService: UserService;
  let taskService: TaskService;

  const mockUserService = {
    getAllUsers: jest.fn(),
    getUserById: jest.fn(),
  };

  const mockTaskService = {
    getAllTasks: jest.fn(),
    getTaskById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: TaskService, useValue: mockTaskService },
      ],
    }).compile();

    controller = module.get<AdminController>(AdminController);
    userService = module.get<UserService>(UserService);
    taskService = module.get<TaskService>(TaskService);
  });

  afterEach(() => jest.clearAllMocks());

  // ============================
  // GET /user
  // ============================
  it('should return all users', () => {
    const expected = [{ id: 1 }, { id: 2 }];
    mockUserService.getAllUsers.mockReturnValue(expected);

    const result = controller.getAllUsers();

    expect(userService.getAllUsers).toHaveBeenCalled();
    expect(result).toEqual({
      message: "Получены все пользователи",
      errCode: 0,
      data: expected,
    });
  });

  // ============================
  // GET /user/:id
  // ============================
  it('should return user profile by id', () => {
    const id = 5;
    const expected = { id, name: 'AdminUser' };

    mockUserService.getUserById.mockReturnValue(expected);

    const result = controller.getUserProfile(id);

    expect(userService.getUserById).toHaveBeenCalledWith(id);
    expect(result).toEqual({
      message: `Получены данные пользователя с id = ${id}`,
      errCode: 0,
      data: expected,
    });
  });

  // ============================
  // GET /task
  // ============================
  it('should return all tasks', () => {
    const expected = [{ id: 1 }, { id: 2 }];
    mockTaskService.getAllTasks.mockReturnValue(expected);

    const result = controller.getAllTasks();

    expect(taskService.getAllTasks).toHaveBeenCalled();
    expect(result).toEqual({
      message: "Получены все задачи",
      errCode: 0,
      data: expected,
    });
  });

  // ============================
  // GET /task/:id
  // ============================
  it('should return task by id', () => {
    const id = 10;
    const expected = { id, title: 'Test Task' };

    mockTaskService.getTaskById.mockReturnValue(expected);

    const result = controller.getTask(id);

    expect(taskService.getTaskById).toHaveBeenCalledWith(id);
    expect(result).toEqual({
      message: `Получены данные задачи с id = ${id}`,
      errCode: 0,
      data: expected,
    });
  });
});
