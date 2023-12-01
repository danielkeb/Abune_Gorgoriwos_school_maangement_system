import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateAdminTeacherDto {
    @IsString()
    @IsOptional()
    phone?:string

    @IsString()
    @IsOptional()
    username?:string

    @IsString()
    @IsOptional()
    education_level?:string

    @IsString()
    @IsOptional()
    first_name?:string

    @IsString()
    @IsOptional()
    last_name?:string

    @IsString()
    @IsOptional()
    middle_name?:string

    @IsString()
    @IsOptional()
    address?:string

}