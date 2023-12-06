import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class GradeLevel {
  @IsNotEmpty()
  @IsString()
  grade: string;

  @IsNotEmpty()
  @IsString()
  section: string;

  @IsNotEmpty()
  @IsInt()
  teacher_id: number;
}
