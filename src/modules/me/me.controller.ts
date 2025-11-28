import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { TaskService } from '../task/task.service';
import { CreateTaskDto } from '../task/dto/create-task.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';

@Controller()
export class MeController {

    constructor(private readonly userService: UserService, private readonly taskService: TaskService) { }

    @Get()
    getProfile(): { message: string, errCode: number, data: any } {

        const userId = 1; // Значение должно быть получено из токена авторизации
        const data = this.userService.getUserById(userId);

        return { message: "Мой профиль", errCode: 0, data: data }
    }

    @Patch()
    updateProfile(@Body() dto: UpdateUserDto): { message: string, errCode: number, data: any } {

        const userId = 1; // Значение должно быть получено из токена авторизации
        const data = this.userService.updateUser(userId, dto);

        return { message: "Мой профиль обновлен", errCode: 0, data: data }
    }

    @Delete()
    deleteProfile(): { message: string, errCode: number, data: any } {

        const userId = 1; // Значение должно быть получено из токена авторизации
        const data = this.userService.deleteUser(userId);

        return { message: "Мой профиль удален", errCode: 0, data: data }
    }

    @Post('task')
    createTask(@Body() dto: CreateTaskDto): { message: string, errCode: number, data: any } {

        const userId = 1; // Значение должно быть получено из токена авторизации
        const data = this.taskService.createTask(userId, dto);

        return { message: "Задача создана", errCode: 0, data: data }
    }

    @Get('task')
    getTasks(): { message: string, errCode: number, data: any } {

        const userId = 1; // Значение должно быть получено из токена авторизации
        const data = this.taskService.getAllUserTasks(userId);

        return { message: "Все задачи пользователя", errCode: 0, data: data }
    }
}

