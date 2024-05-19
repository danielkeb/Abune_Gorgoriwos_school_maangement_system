import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class DtoUpdateUser {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  password?: string;
}