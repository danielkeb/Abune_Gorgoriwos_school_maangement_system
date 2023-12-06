import { Module } from '@nestjs/common';
import { SchoolsModule } from './schools/schools.module';
import { UsersModule } from './users/users.module';
import { TeachersModule } from './teachers/teachers.module';
import { StudentsModule } from './students/students.module';
import { AuthModule } from './auth/auth.module';
import { SubjectsModule } from './subjects/subjects.module';
import { ServiceController } from './service/service.controller';
import { GradeLevelModule } from './grade-level/grade-level.module';

@Module({
  imports: [
    SchoolsModule,
    UsersModule,
    TeachersModule,
    StudentsModule,
    AuthModule,
    SubjectsModule,
    GradeLevelModule,
  ],
  controllers: [ServiceController],
})
export class AppModule {}
