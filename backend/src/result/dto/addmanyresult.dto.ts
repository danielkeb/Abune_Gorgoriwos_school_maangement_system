import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class AddManyResultkDto {
  @ApiProperty()
  @IsOptional()
  assignmentScore2?: number;

  @ApiProperty()
  @IsOptional()
  midtermScore2?: number;

  @ApiProperty()
  @IsOptional()
  test2?: number;

  @ApiProperty()
  @IsOptional()
  test1?: number;

  @ApiProperty()
  @IsOptional()
  finalExamScore2?: number;

  @ApiProperty()
  @IsOptional()
  totalScore2?: number;

  @IsOptional()
  assignmentScore1?: number;

  @ApiProperty()
  @IsOptional()
  midtermScore1?: number;

  @ApiProperty()
  @IsOptional()
  finalExamScore1?: number;

  @ApiProperty()
  @IsOptional()
  totalScore1?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  studentId: number;

}
