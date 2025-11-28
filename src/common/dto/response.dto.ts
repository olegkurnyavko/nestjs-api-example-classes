export class ResponseDto<T = any> {
    message: string;
    errCode: number;
    data: T;

    constructor(message: string, errCode: number, data: T) {
        this.message = message;
        this.errCode = errCode;
        this.data = data;
    }

}
