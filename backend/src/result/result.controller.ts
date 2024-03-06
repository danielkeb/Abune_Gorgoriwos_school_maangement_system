import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
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
    @Body() dto:AddManyResultkDto[]
  ){
    return this.resultService.addManyResult(dto, gradeLevelId,teacherId,subjectId);
  }


  @Patch('update/:id')
  updateMark(
    @Body() dto: UpdateResultDto,
    @Param('id', ParseIntPipe) resultId: number,
  ) {
    return this.resultService.updateMark(dto, resultId);
  }
}
