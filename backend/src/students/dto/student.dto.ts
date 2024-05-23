import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator';

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
  @IsString()
  last_name?: string;

  @IsString()
  @IsString()
  middle_name?: string;

  @IsString()
  @IsString()
  status?: string;

  @IsOptional()
  @IsInt()
  sectionId?: number;

  @IsOptional()
  @IsInt()
  gradeId?: number;

  @IsOptional()
  @IsString()
  section?: string;

  @IsOptional()
  @IsString()
  careof_contact1?: string;


  @IsOptional()
  @IsString()
  phone?: string;

  @IsString()
  @IsEmail()
  email?: string;
  
  @IsString()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  date_of_birth?: string;
}

