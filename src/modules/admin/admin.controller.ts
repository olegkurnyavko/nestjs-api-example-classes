import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { TaskService } from '../task/task.service';
import { ResponseDto } from '../../common/dto/response.dto';

@Controller()
export class AdminController {

    constructor(private readonly userService: UserService, private readonly taskService: TaskService) { }

    @Get('user')
    getAllUsers(): ResponseDto<any[]> {

        const data = this.userService.getAllUsers();
        
        return { message: "Получены все пользователи", errCode: 0, data: data };
    }


    @Get('user/:id')
    getUserProfile(@Param('id') id: number): ResponseDto<any> {

        const data = this.userService.getUserById(id);
        
        return { message: `Получены данные пользователя с id = ${id}`, errCode: 0, data: data };
    }

    
    @Get('task')
    getAllTasks(): ResponseDto<any[]> {

        const data = this.taskService.getAllTasks();
        
        return { message: "Получены все задачи", errCode: 0, data: data };
    }


    @Get('task/:id')
    getTask(@Param('id') id: number): ResponseDto<any> {

        const data = this.taskService.getTaskById(id);

        return { message: `Получены данные задачи с id = ${id}`, errCode: 0, data: data };
    }

}
