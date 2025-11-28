import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {

    // В данном случае везде будем возвращать обычный js-объект, затем он
    // будет автоматически преобразован в json-объект (т.е. строку).
    // Но технически можно было бы сразу передавать json-объект, т.е.
    // надо было бы брать ключи в кавычки. С другой стороны надо помнить, что 
    // JS не делает различия между ключами в кавычках и без. Для него все это
    // является js-объектом. При необходимости потом он сам превращает такие объекты в 
    // форматированные строки типа json.

    getAllUsers(): any[] {

        const usersData: any = [
            { id: 1, name: 'Jane Smith', email: 'jane@domain.com'  },
            { id: 2, name: 'Tom Smith',  email: 'tom@domain.com'   },
        ];
        return usersData;

    }

    getUserById(id: number): { id: number, email: string } {

        const userData: { id: number, email: string } = { id: id, email: 'jane@domain.com', };
        return userData;

    }

    createUser(login: string, password: string ): { login: string, password: string } {
        
        const userData: { login: string, password: string } = { login, password, };
        return userData;

    }

    authenticateUser(login: string, password: string ): string {

        const data: string = 'jwt-token';
        return data;

    }

    updateUser( id: number, name: string, password: string ): { id: number, name: string, password: string } {

        const userData: { id: number, name: string, password: string } = { id, name, password, };
        return userData;

    }

    deleteUser(id: number): { id: number, email: string } {

        const userData: { id: number, email: string } = { id: id, email: 'jane@domain.com', };
        return userData;

    }

}
