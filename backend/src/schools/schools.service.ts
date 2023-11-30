import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DtoSchool } from './dto';

@Injectable()
export class SchoolsService {
  constructor(private prisamService: PrismaService) {}
  async schoolRegistered(dto: DtoSchool) {
    const school = await this.prisamService.school.create({
      data: {
        ...dto,
      },
    });
    return school;
  }
}
