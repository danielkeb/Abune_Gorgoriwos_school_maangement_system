import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class SubjectUpdateDto {
  @ApiProperty()
  @IsInt()
  @IsOptional()
  subjectId?: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  sectionId?: number;
}
export class ConnectUpdateDto {
  @ApiProperty()
  @IsInt()
  @IsOptional()
  sectionId?: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  subjectId?: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  gradeId?: number;
}
