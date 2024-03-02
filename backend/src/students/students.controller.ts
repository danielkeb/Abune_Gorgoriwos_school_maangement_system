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
import { GetUser } from 'src/auth/decorator';
import { RoleGuard } from 'src/auth/decorator/roles.guard';
import { Role } from 'src/auth/decorator/enums/role.enum';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { User } from '@prisma/client';

// @ApiTags('students')
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
  // @UseGuards(JwtGuard, RoleGuard)
  // @Roles(Role.ADMIN)
  @Get('get')
  getStudents() {
    return this.studentsService.getStudents();
  }
  // @UseGuards(JwtGuard, RoleGuard)
  // @Roles(Role.STUDENT)
  @Get('get/:id')
  getStudent(@Param('id', ParseIntPipe) id: number) {
    return this.studentsService.getStudent(id);
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Roles(Role.STUDENT)
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }
  @Get('result')
  getResult(@Param('id', ParseIntPipe) id: number) {
    return this.studentsService.getResult(id);
  }
}
