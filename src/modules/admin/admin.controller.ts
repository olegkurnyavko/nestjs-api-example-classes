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
        
        return new ResponseDto("Получены все пользователи", 0, data);
    }


    @Get('user/:id')
    getUserProfile(@Param('id') id: number): ResponseDto<any> {

        const data = this.userService.getUserById(id);
        
        return new ResponseDto(`Получены данные пользователя с id = ${id}`, 0, data);
    }

    
    @Get('task')
    getAllTasks(): ResponseDto<any[]> {

        const data = this.taskService.getAllTasks();
        
        return new ResponseDto("Получены все задачи", 0, data);
    }


    @Get('task/:id')
    getTask(@Param('id') id: number): ResponseDto<any> {

        const data = this.taskService.getTaskById(id);

        return new ResponseDto(`Получены данные задачи с id = ${id}`, 0, data);
    }

}
