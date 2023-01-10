import { IsObject, IsString, MinLength } from 'class-validator';

export class CreateConfigRequestDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsObject()
  env: object;
}
