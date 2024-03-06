import { IsBoolean, IsInt, IsNotEmpty, IsString } from "class-validator"


export class CallanderDto{
    @IsNotEmpty()
    @IsInt()
    id :number
    @IsNotEmpty()
    @IsString()
    title:string
    @IsNotEmpty()
    @IsString()
    start:string
    @IsNotEmpty()
    @IsBoolean()
    allDay:boolean

}