import { Module } from '@nestjs/common';
import { SchoolsModule } from './schools/schools.module';
import { UsersModule } from './users/users.module';
import { TeachersModule } from './teachers/teachers.module';
import { StudentsModule } from './students/students.module';
import { AuthModule } from './auth/auth.module';
import { YearModule } from './year/year.module';
import { MarksheetModule } from './marksheet/marksheet.module';
import { SubjectModule } from './subject/subject.module';
import { ClassModule } from './class/class.module';
import { SectionModule } from './section/section.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [
    SchoolsModule,
    UsersModule,
    TeachersModule,
    StudentsModule,
    AuthModule,
    YearModule,
    MarksheetModule,
    SubjectModule,
    ClassModule,
    SectionModule,
    ScheduleModule,
  ],
})
export class AppModule {}
