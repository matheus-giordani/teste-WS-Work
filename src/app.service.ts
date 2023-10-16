import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    throw new HttpException('Forbidden', 404);
    return 'teste';
  }
}
