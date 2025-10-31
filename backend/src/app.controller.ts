import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot(): string {
    console.log('NestJS + Docker is working!');
    return 'NestJS + Docker is working!';
  }
}
