import { IsNotEmpty, IsString } from 'class-validator';
export class DtoSchool {
  @IsNotEmpty()
  @IsString()
  school_name: string;

  @IsNotEmpty()
  @IsString()
  school_address: string;

  @IsNotEmpty()
  @IsString()
  school_phone: string;
}
