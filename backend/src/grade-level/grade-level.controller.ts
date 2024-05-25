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
  addGradeLevel(@Body() dto: GradeLevel) {
    return this.gradeLevelService.addGradeLevel(dto);
  }

  @Patch('update/:id')
  updateGradeLevel(
    @Param('id', ParseIntPipe) gradeId: number,
    @Body() dto: GradeLevel,
  ) {
    return this.gradeLevelService.updateGradeLevel(gradeId, dto);
  }

  @Get('get/:id')
  getGradeLevel(@Param('id', ParseIntPipe) id: number) {
    return this.gradeLevelService.getGradeLevel(id);
  }
  @Get('manage/:id')
  manageGradeLevel(@Param('id', ParseIntPipe) id: number) {
    return this.gradeLevelService.manageGradeLevel(id);
  }
}
