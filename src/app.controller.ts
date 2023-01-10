import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('create-token')
  createToken() {
    return this.appService.createToken();
  }

  @Get('consume-token')
  consumeToken() {
    return this.appService.consumeToken();
  }
}
