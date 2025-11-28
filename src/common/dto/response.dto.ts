export class ResponseDto<T = any> {
    message: string;
    errCode: number;
    data: T;
}
