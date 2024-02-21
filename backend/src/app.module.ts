import { Module } from '@nestjs/common';
import { SchoolsModule } from './schools/schools.module';
import { UsersModule } from './users/users.module';
import { TeachersModule } from './teachers/teachers.module';
import { StudentsModule } from './students/students.module';
import { AuthModule } from './auth/auth.module';
import { SubjectsModule } from './subjects/subjects.module';
import { GradeLevelModule } from './grade-level/grade-level.module';
import { ResultModule } from './result/result.module';
import { EmailModule } from './email/email.module';
import { SectionModule } from './section/section.module';

@Module({
  imports: [
    SchoolsModule,
    UsersModule,
    TeachersModule,
    StudentsModule,
    AuthModule,
    SubjectsModule,
    GradeLevelModule,
    ResultModule,
    EmailModule,
    SectionModule
  ],
})
export class AppModule {}
