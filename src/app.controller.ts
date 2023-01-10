import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateConfigRequestDto } from './dto/create-config.request.dto';
import { GetConfigRequestDto } from './dto/get-config.request.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('create-config')
  createConfig(@Body() config: CreateConfigRequestDto) {
    return this.appService.createConfig(config);
  }

  @Get('create-token')
  createToken(@Query('name') name: string) {
    return this.appService.createToken(name);
  }

  @Post('get-config')
  getConfig(@Body() data: GetConfigRequestDto) {
    return this.appService.getConfig(data);
  }
}
