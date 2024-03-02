import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
export class DtoSchool {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  school_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  school_address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  school_phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  schoolYearId:number
}
