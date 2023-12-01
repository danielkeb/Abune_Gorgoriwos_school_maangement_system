<<<<<<< HEAD
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
=======
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
>>>>>>> 432a02fbb77cd2311d9370708dd1d844b91d587f

export class DtoStudent {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  frist_name: string;

  @IsNotEmpty()
  @IsString()
  middle_name: string;
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  enrollment_date?: string;

  @IsOptional()
  @IsString()
  careOf_contact1?: string;

  @IsOptional()
  @IsString()
  careOf_contact2?: string;

  @IsOptional()
  @IsInt()
  grade?: number;

  @IsOptional()
  @IsString()
  education_level?: string;
}
