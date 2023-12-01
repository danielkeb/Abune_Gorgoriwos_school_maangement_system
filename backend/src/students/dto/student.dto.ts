import { IsEmail, IsOptional, IsString } from 'class-validator';

export class DtoStudent {
  @IsOptional()
  @IsString()
  phone?: string;

  @IsString()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  password?: string;
}
