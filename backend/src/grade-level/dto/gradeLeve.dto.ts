import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
enum ClassType {
  nursery = 'nursery',
  junior_primary = 'junior primary',
  senior_primary = 'senior primary',
  junior_secondary = 'junior secondary',
  senior_secondary = 'senior secondary',
}
export class GradeLevel {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  grade: string;

  @IsOptional()
  @IsEnum(ClassType)
  classType?: ClassType;

}
