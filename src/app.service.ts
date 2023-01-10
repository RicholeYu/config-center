import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as rTracer from 'cls-rtracer';
import { Model, QueryTimestampsConfig, SchemaTimestampsConfig } from 'mongoose';
import { CreateConfigRequestDto } from './dto/create-config.request.dto';
import { GetConfigRequestDto } from './dto/get-config.request.dto';
import { ConfigEntity } from './entity/config.entity';
import { Timestamps } from './types/timestamp.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(ConfigEntity.name)
    private readonly configModel: Model<ConfigEntity & Timestamps>,
  ) {}

  async createConfig(configDto: CreateConfigRequestDto) {
    const configObj = new this.configModel({
      ...configDto,
      token: '',
    });

    const config = await configObj.save();
    return config.toJSON();
  }

  async createToken(name: string) {
    const token = rTracer.id();

    const config = await this.configModel.findOneAndUpdate(
      {
        name,
      },
      {
        token,
      },
    );

    if (!config) {
      throw new BadRequestException({
        msg: 'invalid name',
      });
    }

    return {
      token,
    };
  }

  async getConfig(data: GetConfigRequestDto) {
    const config = await this.configModel.findOneAndUpdate(
      {
        name: data.name,
        token: data.token,
      },
      {
        token: '',
      },
    );

    if (!config) {
      throw new BadRequestException({
        msg: 'invalid token',
      });
    }

    if (this.isExpired(config.updatedAt)) {
      throw new BadRequestException({
        msg: 'expired token',
      });
    }

    return config;
  }

  isExpired(date: string) {
    const expiredTimeStamp =
      new Date(date).getTime() +
      (~~process.env.TOKEN_EXPIRED_TIME || 5 * 60 * 1000);

    return Date.now() > expiredTimeStamp;
  }
}
