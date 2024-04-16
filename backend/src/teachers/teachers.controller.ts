import {
  Controller,
  // UseGuards,
  Patch,
  Body,
  Param,
  ParseIntPipe,
  Get,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
//import { JwtGuard } from 'src/auth/guard/jwt.guard';
import {
  UpdateAdminTeacherDto,
  UpdateTeacherDto,
  SubjectUpdateDto,
  SectionUpdateDto,
} from './dto';
import { TeachersService } from './teachers.service';
import { ApiTags } from '@nestjs/swagger';

// @UseGuards(JwtGuard)
@ApiTags('teachers')
@Controller('teachers')
export class TeachersController {
  constructor(private teacherService: TeachersService) {}
  @Get('get')
  getTeachers() {
    return this.teacherService.getTeachers();
  }
  @Get('get/:id')
  getTeacherById(@Param('id', ParseIntPipe) id: number) {
    return this.teacherService.getTeacherById(id);
  }
  @Patch('update/:id')
  updateTeacher(@GetUser('id') userId: number, @Body() dto: UpdateTeacherDto) {
    return this.teacherService.updateTeacher(userId, dto);
  }

  @Patch('adminUpdate/:id')
  updateAdminTeacher(
    @Body() dto: UpdateAdminTeacherDto,
    @Param('id', ParseIntPipe) userId: number,
  ) {
    return this.teacherService.updateAdminTeacher(dto, userId);
  }

  @Get('grade/:id')
  getTeachersGrade(@Param('id', ParseIntPipe) id: number) {
    return this.teacherService.getTeachersGrade(id);
  }

  @Get('graderte/:id646')
  getTeachersStudent(@Param('id', ParseIntPipe) id: number) {
    return this.teacherService.getTeachersGrade(id);
  }
  @Patch('update/:id/:gradeId/:sectionId/:subjectId')
  updateTeacherFields(
    @Param('id', ParseIntPipe) id: number,
    @Param('gradeId', ParseIntPipe) gradeId: number,
    @Param('sectionId', ParseIntPipe) sectionId: number,
    @Param('subjectId', ParseIntPipe) subjectId: number,
  ) {
    return this.teacherService.updateTeacherFields(
      id,
      gradeId,
      sectionId,
      subjectId,
    );
  }
  @Patch('add/subject/:teacherId')
  updateTeacherSubject(
    @Param('teacherId', ParseIntPipe) teacherId: number,
    @Body() dto: SubjectUpdateDto,
  ) {
    return this.teacherService.updateTeacherSubject(teacherId, dto);
  }

  @Patch('remove/subject/:teacherId')
  disconnectTeacherSubject(
    @Param('teacherId', ParseIntPipe) teacherId: number,
    @Body() dto: SubjectUpdateDto,
  ) {
    return this.teacherService.disconnectTeacherSubject(teacherId, dto);
  }

  @Patch('add/section/:teacherId')
  updateTeacherSection(
    @Param('teacherId', ParseIntPipe) teacherId: number,
    @Body() dto: SectionUpdateDto,
  ) {
    return this.teacherService.updateTeacherSection(teacherId, dto);
  }

  @Patch('remove/section/:teacherId')
  disconnectTeacherSection(
    @Param('teacherId', ParseIntPipe) teacherId: number,
    @Body() dto: SectionUpdateDto,
  ) {
    return this.teacherService.disconnectTeacherSection(teacherId, dto);
  }
}
