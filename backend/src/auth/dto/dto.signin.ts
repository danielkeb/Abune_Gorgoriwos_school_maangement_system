import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class DtoSignin {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
