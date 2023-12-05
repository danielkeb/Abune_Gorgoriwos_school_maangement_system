import { IsNotEmpty, IsString } from "class-validator";


export class AddSubjectsDto {
    @IsString()
    @IsNotEmpty()
    name:string
}