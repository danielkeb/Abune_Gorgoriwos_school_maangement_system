import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class GradeLevel {
  @IsNotEmpty()
  @IsString()
  grade: string;

  // @IsNotEmpty()
  // @IsInt()
  // section_id: number;

  @IsNotEmpty()
  @IsInt()
  teacher_id: number;
}