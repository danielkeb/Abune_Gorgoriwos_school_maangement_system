import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { AddSubjectsDto } from './dto';
//import { GetUser } from 'src/auth/decorator';
import { UpdateSubjectDto } from './dto/update.subject.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('subjects')
@Controller('subjects')
export class SubjectsController {
  constructor(private subjectsService: SubjectsService) {}

  @Post('add/:schoolId')
  addSubject(
    @Param('schoolId', ParseIntPipe) schoolId: number,
    @Body() dto: AddSubjectsDto,
  ) {
    return this.subjectsService.addSubject(schoolId, dto);
  }

  @Get('get/:id')
  getSubject(@Param('id', ParseIntPipe) id: number) {
    return this.subjectsService.getSubject(id);
  }
  @Delete('delete/:id')
  deleteSubject(@Param('id', ParseIntPipe) id: number) {
    return this.subjectsService.deleteSubject(id);
  }
  @Get('get/:schoolId/:id')
  searchSubjects(
    @Param('schoolId', ParseIntPipe) schoolId: number,
    @Param('id', ParseIntPipe) subId: number,
  ) {
    return this.subjectsService.searchSubjects(schoolId, subId);
  }
  @Patch('update/:id')
  updateSubjects(
    @Body() dto: UpdateSubjectDto,
    @Param('id', ParseIntPipe) subId: number,
  ) {
    return this.subjectsService.updateSubjects(dto, subId);
  }
}
