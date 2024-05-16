import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Get,
  Post,
} from '@nestjs/common';

import { AddResultkDto, UpdateResultDto } from './dto';
import { ResultService } from './result.service';
import { ApiTags } from '@nestjs/swagger';
import { AddManyResultkDto } from './dto/addmanyresult.dto';
@ApiTags('result')
@Controller('result')
export class ResultController {
  constructor(private resultService: ResultService) {}
  @Post('add')
  addMark(@Body() dto: AddResultkDto) {
    return this.resultService.addMark(dto);
  }
  @Post('addmany/:gradeLevelId/:teacherId/:subjectId')
  addManyResult(
    @Param('gradeLevelId', ParseIntPipe) gradeLevelId: number,
    @Param('teacherId', ParseIntPipe) teacherId: number,
    @Param('subjectId', ParseIntPipe) subjectId: number,
    @Body() dto: AddManyResultkDto[],
  ) {
    return this.resultService.addManyResult(
      dto,
      gradeLevelId,
      teacherId,
      subjectId,
    );
  }

  @Patch('update/:id/:teacherId/:gradeId/:sectionId/:subjectId')
  updateMark(
    @Body() dto: UpdateResultDto,
    @Param('id', ParseIntPipe) resultId: number,
    @Param('id', ParseIntPipe) teacherId: number,
    @Param('gradeId', ParseIntPipe) gradeId: number,
    @Param('sectionId', ParseIntPipe) sectionId: number,
    @Param('subjectId', ParseIntPipe) subjectId: number,
  ) {
    return this.resultService.updateMark(dto, resultId,teacherId,gradeId,sectionId,subjectId);
    
  }
  @Get("get/:id/:gradeId/:sectionId/:subjectId")
  getTeacherResult(
    @Param('id', ParseIntPipe) id: number,
    @Param('gradeId', ParseIntPipe) gradeId: number,
    @Param('sectionId', ParseIntPipe) sectionId: number,
    @Param('subjectId', ParseIntPipe) subjectId: number,
    
    ){
    return this.resultService.getTeacherResult( id,gradeId,sectionId,subjectId);
  }
  // @Delete('delete/:id')
  // deleteResult(@Param('id', ParseIntPipe) id: number) {
  //   return this.resultService.deleteResult(id);
  // }

  @Post('analysis/:gradeId/:semesterId/')
  makeAnalysis(
    @Param('gradeId', ParseIntPipe) gradeId: number,
    @Param('semesterId', ParseIntPipe) semesterId: number,
  ){
  return this.resultService.makeAnalysis(gradeId, semesterId);
  }
  @Get("studentHistory/:id")
  getStudentHistory( @Param('id', ParseIntPipe) id: number,){
    return this.resultService.getStudentHistory(id);
  }
  @Delete('delete/:id')
  deleteResult(@Param('id', ParseIntPipe) id: number) {
    return this.resultService.deleteResult(id);
  }
}
