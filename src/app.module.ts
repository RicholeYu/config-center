import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      imports: [],
      useFactory: () => ({
        uri: process.env.MONGODB_URI
      }),
    }),
    MongooseModule.forFeature([])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
