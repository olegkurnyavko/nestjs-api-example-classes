import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {

    signUp(dto: SignUpDto): { login: string, password: string } {

        const userData: { login: string, password: string } = { login: dto.login, password: dto.password, };
        return userData;

    }

    signIn(dto: SignInDto): string {

        const data: string = 'jwt-token';
        return data;

    }

    recovery(recoveryToken: string): string {
        return 'ok';
    }

}
