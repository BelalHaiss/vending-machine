import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(msg: string, statusCode = 400) {
    super({ msg, custom: true }, statusCode);
  }
}
