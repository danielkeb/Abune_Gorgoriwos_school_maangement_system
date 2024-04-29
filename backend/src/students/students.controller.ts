import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  //UseGuards,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { DtoAdmin, DtoStudent } from './dto';
//import { GetUser } from 'src/auth/decorator';
import { RoleGuard } from '../auth/decorator/roles.guard';
import { Role } from '../auth/decorator/enums/role.enum';
import { Roles } from '../auth/decorator/roles.decorator';
import PromoteStudentsNextGradeDto from './dto/promote.students.nextgrade.dto';
import PromoteStudentsDto from './dto/promote.students.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('students')
//@UseGuards(JwtGuard)
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}
  @Patch('update/:id')
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
  ) {
    return this.studentsService.getStudentbygrade(
      schoolId,
      gradeId,
      sectionId,
      subjectId,
    );
  }
  @Post('promote')
  promoteStudents(@Body() dto: PromoteStudentsNextGradeDto[]) {
    return this.studentsService.promoteStudents(dto);
  }
  @Post('promoteSubjects')
  promoteSubjects(@Body() dto: PromoteStudentsNextGradeDto[]) {
    return this.studentsService.promoteSubjects(dto);
  }
  @Patch('updateStudent/:id')
  updateStudentByAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: DtoAdmin,
  ) {
    return this.studentsService.updateStudentByAdmin(id, dto);
  }
  @UseGuards(JwtGuard, RoleGuard)
  @Roles(Role.STUDENT)
  @Get('get/:id')
  getStudent(@Param('id', ParseIntPipe) id: number) {
    return this.studentsService.getStudent(id);
  }
  @Get('getStudRes/:id')
  getStudentResult(@Param('id', ParseIntPipe) id: number){
   return this.studentsService.getStudentResult(id)
  }
  @Get('get')
  getStudents() {
    return this.studentsService.getStudents();
  }

  @Get('getwith/:school_id/:gradeId/:sectionId/:semesterId')
  getStudentsWith(
    @Param('school_id', ParseIntPipe) school_id: number,
    @Param('gradeId', ParseIntPipe) gradeId: number,
    @Param('sectionId', ParseIntPipe) sectionId: number,
    @Param('semesterId', ParseIntPipe) semesterId: number,
  ) {
    return this.studentsService.getStudentsWith(
      school_id,
      gradeId,
      sectionId,
      semesterId,
    );
  }

  @Get('getwithDisplay/:school_id/:gradeId/:sectionId/:semesterId')
  getStudentsWithForRankDisplay(
    @Param('school_id', ParseIntPipe) school_id: number,
    @Param('gradeId', ParseIntPipe) gradeId: number,
    @Param('sectionId', ParseIntPipe) sectionId: number,
    @Param('semesterId', ParseIntPipe) semesterId: number,
  ) {
    return this.studentsService.getStudentsWithForRankDisplay(
      school_id,
      gradeId,
      sectionId,
      semesterId,
    );
  }
  @Get('studentsPromote/:school_id/:gradeId/:sectionId')
  getStudentsForPromote(
    @Param('school_id', ParseIntPipe) school_id: number,
    @Param('gradeId', ParseIntPipe) gradeId: number,
    @Param('sectionId', ParseIntPipe) sectionId: number,
  ) {
    return this.studentsService.getStudentsForPromote(
      school_id,
      gradeId,
      sectionId,
    );
  }
  @Get('getstu/:schoolId/:gradeId/:sectionId')
  getStudentsForAdmin(
    @Param('schoolId', ParseIntPipe) schoolId: number,
    @Param('gradeId', ParseIntPipe) gradeId: number,
    @Param('sectionId', ParseIntPipe) sectionId: number,
  ) {
    return this.studentsService.getStudentsForAdmin(
      schoolId,
      gradeId,
      sectionId,
    );
  }
  @Post('firstrank')
  calculateRankForFirst(@Body() dto: PromoteStudentsNextGradeDto[]) {
    return this.studentsService.calculateRankForFirst(dto);
  }
  @Post('secondrank')
  calculateRankForSecond(@Body() dto: PromoteStudentsNextGradeDto[]) {
    return this.studentsService.calculateRankForSecond(dto);
  }
  @Post('allrank')
  calculateRankForAll(@Body() dto: PromoteStudentsNextGradeDto[]) {
    return this.studentsService.calculateRankForAll(dto);
  }
  // @Get('section/:id')
  // getSectionRank(@Param('id', ParseIntPipe) sectionName: string) {
  //   return this.studentsService.calculateSectionRank(sectionName);
  // }
  // @Get('section/:id')
  // getStudentsInSection(@Param('id', ParseIntPipe) id: number) {
  //   return this.studentsService.getStudentsInSection(id);
  // }

  // @Get('rank')
  // getRank() {
  //   return this.studentsService.getRank();
  // }
}
