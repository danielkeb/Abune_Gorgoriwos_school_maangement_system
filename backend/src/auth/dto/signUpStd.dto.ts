import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

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

  @IsOptional()
  @IsString()
  username?: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  date_of_birth:string

  @IsNotEmpty()
  @IsString()
  gender:string
  

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
  gradeId: number;

  @IsOptional()
  @IsInt()
  sectionId:number

  @IsOptional()
  @IsString()
  education_level?: string;
}
