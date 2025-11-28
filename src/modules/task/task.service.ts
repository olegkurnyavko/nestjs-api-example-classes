import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {

    // В данном случае везде будем возвращать обычный js-объект, затем он
    // будет автоматически преобразован в json-объект (т.е. строку).
    // Но технически можно было бы сразу передавать json-объект, т.е.
    // надо было бы брать ключи в кавычки. С другой стороны надо помнить, что 
    // JS не делает различия между ключами в кавычках и без. Для него все это
    // является js-объектом. При необходимости потом он сам превращает такие объекты в 
    // форматированные строки типа json.
    
    getAllTasks(): any[] {

        const tasksData: any = [
            { id: 1, title: 'Meeting',     description: 'Remember about meeting' },
            { id: 2, title: 'Write essay', description: 'Do it!' },
        ];
        return tasksData;

    }

    getTaskById(id: number): { id: number, title: string, description: string, dueDate: string, } {
     
        const taskData: { id: number, title: string, description: string, dueDate: string, }
            = { id: id, title: 'Meeting', description: 'Remember about meeting', dueDate: '2025-01-01', };
        return taskData;

    }

    createTask( dto: CreateTaskDto ): { title: string, description: string, dueDate: string } {
        
        const taskData: { title: string, description: string, dueDate: string }
            = { title: dto.title, description: dto.description, dueDate: dto.dueDate, };
        return taskData;
        
    }

    updateTask( dto: UpdateTaskDto ): { id: number, title: string, description: string, dueDate: string, } {

        const taskData: { id: number, title: string, description: string, dueDate: string, }
            = { id: dto.id, title: dto.title, description: dto.description, dueDate: dto.dueDate, };
        return taskData;

    }

    deleteTask(id: number): { id: number, title: string, description: string, dueDate: string, } {

        const taskData: { id: number, title: string, description: string, dueDate: string, }
            = { id: id, title: 'Meeting', description: 'Remember about meeting', dueDate: '2025-01-01', };
        return taskData;

    }

    getAllUserTasks(userId: number): any[] {

        const tasksData: any = [
            { id: 1, title: 'Meeting', description: 'Remember about meeting', userId: userId },
            { id: 2, title: 'Write essay', description: 'Do it!', userId: userId },
        ];
        return tasksData;

    }

}
