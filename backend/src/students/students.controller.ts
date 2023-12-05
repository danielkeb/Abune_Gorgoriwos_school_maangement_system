import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { DtoAdmin, DtoStudent } from './dto';
@UseGuards(JwtGuard)
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
  @Patch('updateStudent')
  updateStudentByAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: DtoAdmin,
  ) {
    return this.studentsService.updateStudentByAdmin(id, dto);
  }
}
