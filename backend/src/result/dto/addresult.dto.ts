import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsNotEmpty } from "class-validator"

export class AddResultkDto{
  @ApiProperty()
  @IsNotEmpty()
  @IsInt() 
  assignmentScore:number

  @ApiProperty()
  @IsNotEmpty()
  @IsInt() 
  midtermScore :number

  @ApiProperty()
  @IsNotEmpty()
  @IsInt() 
  finalExamScore :number

  @ApiProperty()
  @IsNotEmpty()
  @IsInt() 
  totalScore :number

  @ApiProperty()
  @IsNotEmpty()
  @IsInt() 
  studentId :number

  @ApiProperty()
  @IsNotEmpty()
  @IsInt() 
  subjectId:number

  @ApiProperty()
  @IsNotEmpty()
  @IsInt() 
  gradeLevelId:number

  @ApiProperty()
  @IsNotEmpty()
  @IsInt() 
  teacherId:number
}