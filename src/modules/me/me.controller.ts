import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { TaskService } from '../task/task.service';
import { CreateTaskDto } from '../task/dto/create-task.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { ResponseDto } from '../../common/dto/response.dto';

@Controller()
export class MeController {

    constructor(private readonly userService: UserService, private readonly taskService: TaskService) { }

    @Get()
    getProfile(): ResponseDto<any> {

        const userId = 1; // Значение должно быть получено из токена авторизации
        const data = this.userService.getUserById(userId);

        return new ResponseDto("Мой профиль", 0, data);
    }

    @Patch()
    updateProfile(@Body() dto: UpdateUserDto): ResponseDto<any> {

        const userId = 1; // Значение должно быть получено из токена авторизации
        const data = this.userService.updateUser(userId, dto);

        return new ResponseDto("Мой профиль обновлен", 0, data);
    }

    @Delete()
    deleteProfile(): ResponseDto<any> {

        const userId = 1; // Значение должно быть получено из токена авторизации
        const data = this.userService.deleteUser(userId);

        return new ResponseDto("Мой профиль удален", 0, data);
    }

    @Post('task')
    createTask(@Body() dto: CreateTaskDto): ResponseDto<any> {

        const userId = 1; // Значение должно быть получено из токена авторизации
        const data = this.taskService.createTask(userId, dto);

        return new ResponseDto("Задача создана", 0, data);
    }

    @Get('task')
    getTasks(): ResponseDto<any> {

        const userId = 1; // Значение должно быть получено из токена авторизации
        const data = this.taskService.getAllUserTasks(userId);

        return new ResponseDto("Все задачи пользователя", 0, data);
    }
}

