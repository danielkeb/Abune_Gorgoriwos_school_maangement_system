import { IsInt, IsNotEmpty, IsString } from "class-validator";


export class SectionAddDto{
    @IsString()
    @IsNotEmpty()
    name:string

    @IsInt()
    @IsNotEmpty()
    gradeId:number
}