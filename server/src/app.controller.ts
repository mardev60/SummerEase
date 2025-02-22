import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  createSubject(
    @Body() body: { subject: string; username: string },
  ): Promise<any> {
    return this.appService.createSubject(body.subject, body.username);
  }
}
