import { IsInt, IsNotEmpty, IsOptional } from "class-validator"

export class UpdateResultDto{
  @IsNotEmpty()
  @IsInt() 
  @IsOptional()
  assignmentScore?:number
  @IsNotEmpty()
  @IsInt() 
  @IsOptional()
  midtermScore? :number
  @IsNotEmpty()
  @IsInt() 
  @IsOptional()
  finalExamScore? :number
  @IsNotEmpty()
  @IsInt() 
  @IsOptional()
  totalScore? :number
  @IsNotEmpty()
  @IsInt() 
  @IsOptional()
  studentId? :number
  @IsNotEmpty()
  @IsInt() 
  @IsOptional()
  subjectId?:number
  @IsNotEmpty()
  @IsInt() 
  @IsOptional()
  gradeLevelId?:number
  @IsNotEmpty()
  @IsInt() 
  @IsOptional()
  teacherId?:number
}