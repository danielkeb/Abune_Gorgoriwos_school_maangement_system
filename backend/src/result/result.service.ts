import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddResultkDto } from './dto';

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
}

