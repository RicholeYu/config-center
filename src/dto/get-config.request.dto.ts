import { IsString, MinLength } from 'class-validator';

export class GetConfigRequestDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @MinLength(1)
  token: string;
}
