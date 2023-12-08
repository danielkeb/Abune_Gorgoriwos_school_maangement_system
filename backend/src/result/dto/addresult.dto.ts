import { IsInt, IsNotEmpty } from "class-validator"

export class AddResultkDto{
  @IsNotEmpty()
  @IsInt() 
  assignmentScore:number
  @IsNotEmpty()
  @IsInt() 
  midtermScore :number
  @IsNotEmpty()
  @IsInt() 
  finalExamScore :number
  @IsNotEmpty()
  @IsInt() 
  totalScore :number
  @IsNotEmpty()
  @IsInt() 
  studentId :number
  @IsNotEmpty()
  @IsInt() 
  subjectId:number
  @IsNotEmpty()
  @IsInt() 
  gradeLevelId:number
  @IsNotEmpty()
  @IsInt() 
  teacherId:number
}