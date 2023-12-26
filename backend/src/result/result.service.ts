import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddResultkDto, UpdateResultDto } from './dto';

@Injectable()
export class ResultService {

    constructor(private prisma:PrismaService){}

    async addMark(dto:AddResultkDto){
        const marksheet= await this.prisma.result.create({
        data:{
            ...dto
        }
        })

        return {
            msg:"Result Created!",
            data: marksheet
        }
    }

    async updateMark(dto:UpdateResultDto, resultId:number){
        const marksheet= await this.prisma.result.update({where:{id:resultId}, data:{...dto}})


        return {
            msg:"Marksheet Updated",
            data:marksheet
        }
       
    }
}

