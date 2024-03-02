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
}
