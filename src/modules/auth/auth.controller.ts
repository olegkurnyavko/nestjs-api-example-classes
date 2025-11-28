import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { ResponseDto } from '../../common/dto/response.dto';


@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    
    @Post('signup')
    signUp(@Body() dto: SignUpDto): ResponseDto<any> {

        const data = this.authService.signUp(dto)
        return new ResponseDto("Пользователь зарегистрирован", 0, data);

    }

    @Post('signin')
    signIn(@Body() dto: SignInDto): ResponseDto<any> {

        const data = this.authService.signIn(dto);
        return new ResponseDto("Пользователь аутентифицирован", 0, data);

    }

    @Post('recovery')
    recovery(recoveryToken): ResponseDto<any> {

        const data = this.authService.recovery(recoveryToken);
        return new ResponseDto("Пароль восстановлен", 0, data);
        
    }
}
