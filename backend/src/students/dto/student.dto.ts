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

export class DtoAdmin {
  @IsOptional()
  @IsString()
  frist_name?: string;

  @IsString()
  @IsEmail()
  last_name?: string;

  @IsOptional()
  @IsString()
  grade?: number;

  @IsOptional()
  @IsString()
  careof_contact1?: string;

  @IsOptional()
  @IsString()
  careof_contact2?: string;
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

  @IsOptional()
  @IsString()
  education_level?: string;
}
