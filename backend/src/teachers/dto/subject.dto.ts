import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class SubjectUpdateDto {
  @ApiProperty()
  @IsInt()
  @IsOptional()
  subjectId?: number;
}
export class SectionUpdateDto {
  @ApiProperty()
  @IsInt()
  @IsOptional()
  sectionId?: number;
}
