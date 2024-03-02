import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddSubjectsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsInt()
  @IsOptional()
  gradeId?: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  teacherId?: number;
}
