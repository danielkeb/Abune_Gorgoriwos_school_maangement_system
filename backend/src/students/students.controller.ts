import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { DtoAdmin, DtoStudent } from './dto';
import { ApiTags } from '@nestjs/swagger';
import PromoteStudentsDto from './dto/promote.students.dto';
import PromoteStudentsNextGradeDto from './dto/promote.students.nextgrade.dto';

@ApiTags('students')
// @UseGuards(JwtGuard)
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}
  @Post('update/:id')
  studentUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: DtoStudent,
  ) {
    return this.studentsService.studentUpdate(id, dto);
  }
  @Patch('updateStudent/:id')
  updateStudentByAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: DtoAdmin,
  ) {
    return this.studentsService.updateStudentByAdmin(id, dto);
  }

  @Get('by/:schoolId/:gradeId/:sectionId/:subjectId')
  getStudentbygrade(
    @Param('schoolId', ParseIntPipe) schoolId: number,
    @Param('gradeId', ParseIntPipe) gradeId: number,
    @Param('sectionId', ParseIntPipe) sectionId: number,
    @Param('subjectId', ParseIntPipe) subjectId: number,
  ){
    return this.studentsService.getStudentbygrade(schoolId,gradeId, sectionId, subjectId);
  }

  @Post('promote')
  promoteStudents(
    @Body() students:PromoteStudentsNextGradeDto[]
    // @Param('user_id', ParseIntPipe) user_id: number,
    // @Param('gradeId', ParseIntPipe) gradeId: number,
    // @Param('sectionId', ParseIntPipe) sectionId: number,
  ){
    return this.studentsService.promoteStudents(students);
  }
  @Post('promoteSubjects')
  promoteSubjects(
    @Body() students: PromoteStudentsDto[]
  ){

    return this.studentsService.promoteSubjects(students);
  }
}
