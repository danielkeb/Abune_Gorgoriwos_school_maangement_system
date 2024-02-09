import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { GradeLevelService } from './grade-level.service';
import { GradeLevel } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('grade')
@Controller('grade')
export class GradeLevelController {
  constructor(private gradeLevelService: GradeLevelService) {}

  @Post('add')
  addGradeLevel(id: number, @Body() dto: GradeLevel) {
    return this.gradeLevelService.addGradeLevel(id, dto);
  }

  @Patch('update/:id')
  updateGradeLevel(
    @Param('id', ParseIntPipe) gradeId: number,
    @Body() dto: GradeLevel,
  ) {
    return this.gradeLevelService.updateGradeLevel(gradeId, dto);
  }

  @Get("get")
  getGradeLevel(){
    return this.gradeLevelService.getGradeLevel()

  }
}
