import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { Prisma } from '@prisma/client';
import { AccessContorlService } from 'src/shared/access-control.service';
import { JwtModule } from '@nestjs/jwt';
@Module({
  providers: [StudentsService, AccessContorlService],
  controllers: [StudentsController],
  imports: [
    JwtModule.register({}), // Configure JwtModule
  ],
})
export class StudentsModule {}
// student.model.ts

export type StudentUpdateInput = Prisma.StudentUpdateInput & {
  phone?: string;
};
