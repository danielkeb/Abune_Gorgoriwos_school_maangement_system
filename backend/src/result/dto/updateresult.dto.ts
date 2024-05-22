import { IsInt, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateResultDto {
  @IsNumber()
  @IsOptional()
  assignmentScore1?: number;

  @IsNumber()
  @IsOptional()
  test1?:number

  @IsNumber()
  @IsOptional()
  midtermScore1?: number;

  @IsNumber()
  @IsOptional()
  finalExamScore1?: number;

  @IsNumber()
  @IsOptional()
  totalScore1?: number;



  @IsNumber()
  @IsOptional()
  assignmentScore2?: number;

  @IsNumber()
  @IsOptional()
  midtermScore2?: number;

  @IsNumber()
  @IsOptional()
  finalExamScore2?: number;

  @IsNumber()
  @IsOptional()
  totalScore2?: number;

  @IsNumber()
  @IsOptional()
  studentId?: number;
  @IsNumber()
  @IsOptional()
  test2?:number

  @IsNumber()
  @IsOptional()
  subjectId?: number;

  @IsNumber()
  @IsOptional()
  gradeLevelId?: number;

  @IsNumber()
  @IsOptional()
  teacherId?: number;
}
