import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  //UseGuards,
} from '@nestjs/common';
import { StudentsService } from './students.service';
//import { JwtGuard } from '../auth/guard/jwt.guard';
import { DtoAdmin, DtoStudent } from './dto';
import { GetUser } from 'src/auth/decorator';
import { RoleGuard } from 'src/auth/decorator/roles.guard';
import { Role } from 'src/auth/decorator/enums/role.enum';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { User } from '@prisma/client';

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

  @Post('by/:schoolId/:gradeId/:sectionId/:subjectId')
  getStudentbygrade(
    @Param('schoolId', ParseIntPipe) schoolId: number,
    @Param('schoolId', ParseIntPipe) gradeId: number,
    @Param('sectionId', ParseIntPipe) sectionId: number,
    @Param('subjectId', ParseIntPipe) subjectId: number,
  ){
    return this.studentsService.getStudentbygrade(schoolId, gradeId,sectionId,subjectId);
  }
  @Post('promote')
  promoteStudents(@Body() dto: PromoteStudentsNextGradeDto[],){
    return this.studentsService.promoteStudents(dto);

  }
  @Post('promoteSubjects')
  promoteSubjects(@Body() dto: PromoteStudentsDto[]){
    return this.studentsService.promoteSubjects(dto);

  }
  @Patch('updateStudent/:id')
  updateStudentByAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: DtoAdmin,
  ) {
    return this.studentsService.updateStudentByAdmin(id, dto);
  }
  @Get('get/:id')
  getStudent(@Param('id', ParseIntPipe) id: number) {
    return this.studentsService.getStudent(id);
  }

  @Get('get')
  getStudents() {
    return this.studentsService.getStudents();
  }
  // @Get('section/:id')
  // getSectionRank(@Param('id', ParseIntPipe) sectionName: string) {
  //   return this.studentsService.calculateSectionRank(sectionName);
  // }
  @Get('section/:id')
  getStudentsInSection(@Param('id', ParseIntPipe) id: number) {
    return this.studentsService.getStudentsInSection(id);
  }

  @Get('rank')
  getRank() {
    return this.studentsService.getRank();
  }
}
