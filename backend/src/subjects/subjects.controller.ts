import {
  Body,
  Controller,
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

  @Post('add/')
  addSubjects(@Body() dto: AddSubjectsDto) {
    return this.subjectsService.addSubjects(dto);
  }

  @Get('get')
  getSubject() {
    return this.subjectsService.getSubject();
  }
  @Get('delete/:id')
  deleteSubject(@Param('id', ParseIntPipe) id: number) {
    return this.subjectsService.deleteSubject(id);
  }

  @Patch('update/:id')
  updateSubjects(
    @Body() dto: UpdateSubjectDto,
    @Param('id', ParseIntPipe) subId: number,
  ) {
    return this.subjectsService.updateSubjects(dto, subId);
  }
}
