import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateAdminTeacherDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  education_level?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  first_name?: string;

@ApiProperty()
  @IsString()
  @IsOptional()
  last_name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  middle_name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  address?: string;
}
