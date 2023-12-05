import { IsInt, IsOptional, IsString } from "class-validator";

export class UpdateSubjectDto{
    @IsString()
    @IsOptional()
    name?:string


    @IsOptional()
    @IsInt()
    teacherId?:number


}