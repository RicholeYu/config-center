import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  MongooseModule,
  MongooseModuleFactoryOptions,
  SchemaFactory,
} from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigEntity } from './entity/config.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [],
      useFactory: (): MongooseModuleFactoryOptions => ({
        uri: process.env.MONGODB_URI,
      }),
    }),
    MongooseModule.forFeature([
      {
        name: ConfigEntity.name,
        schema: SchemaFactory.createForClass(ConfigEntity),
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
