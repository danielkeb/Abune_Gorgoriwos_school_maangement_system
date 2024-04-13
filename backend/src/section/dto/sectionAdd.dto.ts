import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SectionAddDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  gradeId: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  teacherId?: number;
}

export class SectionUpdateAddDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  gradeId: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  teacherId?: number;
}
