import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  collection: 'config',
  timestamps: true,
})
export class ConfigEntity {
  @Prop({
    type: String,
  })
  name: string;

  @Prop({
    type: Object,
  })
  env: object;

  @Prop({
    type: String,
  })
  token: string;
}
