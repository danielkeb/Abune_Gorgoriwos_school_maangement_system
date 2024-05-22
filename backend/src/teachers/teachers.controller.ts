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
  ConnectUpdateDto,
} from './dto';
import { TeachersService } from './teachers.service';
import { ApiTags } from '@nestjs/swagger';

// @UseGuards(JwtGuard)
@ApiTags('teachers')
@Controller('teachers')
export class TeachersController {
  constructor(private teacherService: TeachersService) {}
  @Get('get/:school_Id')
  getTeachers(@Param('school_Id', ParseIntPipe) school_Id: number) {
    return this.teacherService.getTeachers(school_Id);
  }
  @Get('single_teacher/:id')
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

  @Get('graderte/:id')
  getTeachersStudent(@Param('id', ParseIntPipe) id: number) {
    return this.teacherService.getTeachersGrade(id);
  }
  @Patch('connnect/all/:id')
  updateTeacherFields(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ConnectUpdateDto,
  ) {
    return this.teacherService.updateTeacherFields(id, dto);
  }

  @Patch('disconnect/all/:id')
  disconnectTeacherAll(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ConnectUpdateDto,
  ) {
    return this.teacherService.disconnectTeacherAll(id, dto);
  }
  @Patch('add/subject/:teacherId')
  UpdateTeacherConnect(
    @Param('teacherId', ParseIntPipe) teacherId: number,
    @Body() dto: SubjectUpdateDto,
  ) {
    return this.teacherService.UpdateTeacherConnect(teacherId, dto);
  }
  @Get('fetch/:teacherId')
  fetchTeacher(@Param('teacherId', ParseIntPipe) teacherId: number) {
    return this.teacherService.fetchTeacher(teacherId);
  }

  @Patch('remove/section/subject/:teacherId')
  disconnectTeacher(
    @Param('teacherId', ParseIntPipe) teacherId: number,
    @Body() dto: SubjectUpdateDto,
  ) {
    return this.teacherService.disconnectTeacher(teacherId, dto);
  }
}
