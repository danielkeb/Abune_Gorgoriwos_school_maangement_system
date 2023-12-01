import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';

@Module({
  providers: [StudentsService],
  controllers: [StudentsController],
})
export class StudentsModule {}
// student.model.ts

import { Prisma } from '@prisma/client';

export type StudentUpdateInput = Prisma.StudentUpdateInput & {
  phone?: string;
};
