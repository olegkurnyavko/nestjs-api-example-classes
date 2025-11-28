import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  // ============================
  // getAllTasks
  // ============================
  it('should return all tasks', () => {
    const result = service.getAllTasks();

    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      id: 1,
      title: 'Meeting',
      description: 'Remember about meeting',
    });
  });

  // ============================
  // getTaskById
  // ============================
  it('should return task by id', () => {
    const id = 5;
    const result = service.getTaskById(id);

    expect(result).toEqual({
      id,
      title: 'Meeting',
      description: 'Remember about meeting',
      dueDate: '2025-01-01',
    });
  });

  // ============================
  // createTask
  // ============================
  it('should create a task', () => {
    const title = 'New task';
    const description = 'Do homework';
    const dueDate = '2025-12-31';

    const result = service.createTask(title, description, dueDate);

    expect(result).toEqual({ title, description, dueDate });
  });

  // ============================
  // updateTask
  // ============================
  it('should update an existing task', () => {
    const id = 10;
    const title = 'Updated';
    const description = 'Updated description';
    const dueDate = '2030-01-01';

    const result = service.updateTask(id, title, description, dueDate);

    expect(result).toEqual({
      id,
      title,
      description,
      dueDate,
    });
  });

  // ============================
  // deleteTask
  // ============================
  it('should delete task and return deleted task data', () => {
    const id = 3;
    const result = service.deleteTask(id);

    expect(result).toEqual({
      id,
      title: 'Meeting',
      description: 'Remember about meeting',
      dueDate: '2025-01-01',
    });
  });

  // ============================
  // getAllUserTasks
  // ============================
  it('should return all tasks for a specific user', () => {
    const userId = 7;

    const result = service.getAllUserTasks(userId);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      id: 1,
      title: 'Meeting',
      description: 'Remember about meeting',
      userId,
    });
    expect(result[1]).toEqual({
      id: 2,
      title: 'Write essay',
      description: 'Do it!',
      userId,
    });
  });
});
