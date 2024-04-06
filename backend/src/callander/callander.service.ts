import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CallanderDto } from './dto/callander.dto';


@Injectable()
export class CallanderService {
    constructor(private prismaService: PrismaService) {}
    async addCallander(dto:CallanderDto){
     const post=  await this.prismaService.calander.create({data:{id:dto.id, title:dto.title, start:dto.start, allDay:dto.allDay}});
     return post;
    }
    async getAllCallanders(){
        const callanders= await this.prismaService.calander.findMany({})
        return callanders;
    }

    async removeById(id: number) {
      const getPost= await this.prismaService.calander.findMany({where:{id:id}})
      // const go= (await getPost).map(p=>p.id)
   
     const deletePost=   await this.prismaService.calander.delete({
          where: {
            sub: getPost[0].sub,
          },
        });

        return{
          msg:"Post Deleted succesfully "
        }
      }
      async getSpecCallanders(){
        const currentYear = new Date().getFullYear();
        const callanders= await this.prismaService.calander.findMany({})
        // Filter out calendars starting with the current year
    const currentYearCalendars = callanders.filter(calendar => {
      const calendarStartYear = new Date(calendar.start).getFullYear();
      return calendarStartYear === currentYear;
    });
    
    return currentYearCalendars;

      }
}
