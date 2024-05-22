import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UploadCourse } from './dto/course.dto';
import path from 'path';
import fs from 'fs';

@Injectable()
export class CoursematerialService {
  constructor(private prismaService: PrismaService) {}

  async uploadCourseMaterial(
    filepath: string,
    teacher: number,
    subjectId: number,
    gradeId: number,
    schoolId: number,
    dto: UploadCourse,
  ) {
    try {
      const teachId = parseInt(teacher.toString(), 10);
      const Id = parseInt(schoolId.toString(), 10);
      const course = await this.prismaService.courseMaterial.create({
        data: {
          description: dto.description,
          file: filepath,
          teacherId: teachId,
          schoolId: Id,
        },
      });

      if (!course) {
        throw new NotFoundException('Course material not created');
      }

      const grade = await this.prismaService.gradeLevel.findUnique({
        where: { id: Number(gradeId) },
      });

      const subject = await this.prismaService.subject.findUnique({
        where: { id: Number(subjectId) },
      });

      if (!subject && !grade) {
        throw new NotFoundException('Subject not found or grade not found');
      }

      await this.prismaService.gradeLevel.update({
        where: { id: Number(gradeId) },
        data: { courseMaterial: { connect: { id: course.id } } },
      });

      await this.prismaService.subject.update({
        where: { id: Number(subjectId) },
        data: { courseMaterial: { connect: { id: course.id } } },
      });

      return course;
    } catch (error) {
      console.error('Error in uploadCourseMaterial:', error);
      throw error;
    }
  }

  async getStudyMaterials() {
    const study = await this.prismaService.courseMaterial.findMany({
      include: {
        gradeLevel: {
          include: { subject: { select: { id: true, name: true } } },
        },
      },
    });
    return study;
  }

  async downloadMaterial(filename: string): Promise<Buffer> {
    const filePath = path.join(__dirname, '..', 'coursematerial', filename);
    try {
      const fileBuffer = fs.readFileSync(filePath);
      return fileBuffer;
    } catch (error) {
      throw new NotFoundException(`File ${filename} not found`);
    }
  }
  async deleteCourseMaterial(id: number) {
    try {
      const course = await this.prismaService.courseMaterial.delete({
        where: { id },
      });

      if (!course) {
        throw new NotFoundException('Course material not found');
      }
    } catch (error) {
      console.error('Error in deleteCourseMaterial:', error);
      throw error;
    }
  }
}
