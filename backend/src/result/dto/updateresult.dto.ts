import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateResultDto {
  @IsInt()
  @IsOptional()
  assignmentScore1?: number;

  @IsInt()
  @IsOptional()
  test1?:number

  @IsInt()
  @IsOptional()
  midtermScore1?: number;

  @IsInt()
  @IsOptional()
  finalExamScore1?: number;

  @IsInt()
  @IsOptional()
  totalScore1?: number;



  @IsInt()
  @IsOptional()
  assignmentScore2?: number;

  @IsInt()
  @IsOptional()
  midtermScore2?: number;

  @IsInt()
  @IsOptional()
  finalExamScore2?: number;

  @IsInt()
  @IsOptional()
  totalScore2?: number;

  @IsInt()
  @IsOptional()
  studentId?: number;
  @IsInt()
  @IsOptional()
  test2?:number

  @IsInt()
  @IsOptional()
  subjectId?: number;

  @IsInt()
  @IsOptional()
  gradeLevelId?: number;

  @IsInt()
  @IsOptional()
  teacherId?: number;
}
