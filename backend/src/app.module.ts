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
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import { YearModule } from './year/year.module';
import { CallanderModule } from './callander/callander.module';
import { CoursematerialModule } from './coursematerial/coursematerial.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SharedModule,
    SchoolsModule,
    UsersModule,
    TeachersModule,
    StudentsModule,
    AuthModule,
    SubjectsModule,
    GradeLevelModule,
    ResultModule,
    EmailModule,
    SectionModule,
    SectionModule,
    YearModule,
    CallanderModule,
    CoursematerialModule,
  ],
})
export class AppModule {}
