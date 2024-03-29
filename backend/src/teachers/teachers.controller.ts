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
import { UpdateAdminTeacherDto, UpdateTeacherDto } from './dto';
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
  // @Get('by/:schoolId/:gradeId/:subjectId')
  // getTeacherSection(
  //   @Param('schoolId', ParseIntPipe) schoolId: number,
  //   @Param('gradeId', ParseIntPipe) gradeId: number,
  //   // @Param('sectionId', ParseIntPipe) sectionId: number,
  //   @Param('subjectId', ParseIntPipe) subjectId: number,
  // ){
  //   return this.teacherService.getTeacherSection(schoolId,gradeId, subjectId);
  // }
}
