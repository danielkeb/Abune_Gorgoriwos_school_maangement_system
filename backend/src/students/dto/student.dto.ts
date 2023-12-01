import { IsNotEmpty, IsString } from 'class-validator';

export class DtoStudent {
  @IsNotEmpty()
  @IsString()
  enrollment_date: string;

  @IsNotEmpty()
  @IsString()
  section: string;

  @IsNotEmpty()
  @IsString()
  careOf_contact1: string;

  @IsNotEmpty()
  @IsString()
  careOf_contact2: string;

  @IsNotEmpty()
  @IsString()
  grade: number;
}
