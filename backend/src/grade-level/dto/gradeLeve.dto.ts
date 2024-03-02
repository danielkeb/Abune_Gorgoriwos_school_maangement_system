import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GradeLevel {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  grade: string;

  // // @IsNotEmpty()
  // // @IsInt()
  // // section_id: number;

  // @ApiProperty()
  // @IsNotEmpty()
  // @IsInt()
  // teacher_id: number;
}
