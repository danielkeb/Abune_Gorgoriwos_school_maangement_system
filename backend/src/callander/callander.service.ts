import { Injectable } from '@nestjs/common';
import { CallanderDto } from './dto/callander.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CallanderService {
  constructor(private prismaService: PrismaService) {}
  async addCallander(dto: CallanderDto, school_Id:number) {
    const post = await this.prismaService.calander.create({
      data: {
        id: dto.id,
        title: dto.title,
        start: dto.start,
        allDay: dto.allDay,
        schoolId:school_Id
      },
    });
    return post;
  }
  async getAllCallanders(school_Id:number) {
    const callanders = await this.prismaService.calander.findMany({where:{schoolId:school_Id}});
    return callanders;
  }

  async getAllCallandersAdmin(school_Id:number){
    const callanders = await this.prismaService.calander.findMany({where:{OR: [
      { schoolId: school_Id },
      { schoolId: 0 } // Add this condition to handle schoolId 0
    ]}});
    return callanders;
  }

  async removeById(id: number) {
    const getPost = await this.prismaService.calander.findMany({
      where: { id: id },
    });
    // const go= (await getPost).map(p=>p.id)

    const deletePost = await this.prismaService.calander.delete({
      where: {
        sub: getPost[0].sub,
      },
    });

    return {
      msg: 'Post Deleted succesfully ',
    };
  }
}
