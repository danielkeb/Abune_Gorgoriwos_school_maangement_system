import { Injectable } from '@nestjs/common';
import { SectionAddDto } from './dto/sectionAdd.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SectionService {
  constructor(private prismaService: PrismaService) {}
  async addSection(dto: SectionAddDto) {
    try {
      const { gradeId, name } = dto;

      // Check if gradeId exists
      const gradeLevel = await this.prismaService.gradeLevel.findUnique({
        where: {
          id: gradeId,
        },
      });

      if (!gradeLevel) {
        return {
          msg: 'Grade level does not exist!',
        };
      }

      // Check if a section with the same gradeId and name already exists
      const existingSection = await this.prismaService.section.findFirst({
        where: {
          gradeId,
          name,
        },
      });

      if (existingSection) {
        return {
          msg: 'Section already exists!',
        };
      }

      // If no section with the same gradeId and name exists, create the new section
      const addSection = await this.prismaService.section.create({
        data: {
          ...dto,
        },
      });

      return {
        msg: 'Section added!',
        addSection,
      };
    } catch (error) {
      // Handle unexpected errors
      console.error('Error adding section:', error);
      return {
        msg: 'An error occurred while adding the section.',
      };
      const findSection = await this.prismaService.section.findMany({
        where: { ...dto },
      });
      if (findSection.length > 0) {
        return findSection;
      }
    }
  }
  async getSection() {
    const getSection = await this.prismaService.section.findMany({
      select: {
        gradeId: true,
        name: true,
        gradelevel: { select: { grade: true, student: true } },
      },
    });
    return getSection;
  }
  async getStudent(secid: number) {
    const std = await this.prismaService.section.findUnique({
      where: {
        id: secid,
      },
      select: {
        gradeId: true,
        name: true,
        gradelevel: {
          select: { grade: true, student: { select: { result: true } } },
        },
      },
    });
    return std;
  }
}
