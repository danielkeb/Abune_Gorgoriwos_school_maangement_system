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
import { SectionService } from './section.service';
import { SectionAddDto } from './dto/sectionAdd.dto';
import { ApiTags } from '@nestjs/swagger';
import { SectionUpdateAddDto } from './dto/sectionadd.update.dto';

@ApiTags('section')
@Controller('section')
export class SectionController {
  constructor(private sectionService: SectionService) {}

  @Post('add/:schoolId')
  addSection(
    @Param('schoolId', ParseIntPipe) schoolId: number,
    @Body() dto: SectionAddDto,
  ) {
    return this.sectionService.addSection(schoolId, dto);
  }

  @Get('get/:id/students')
  getSection(@Param('id', ParseIntPipe) id: number) {
    return this.sectionService.searchSection(id);
  }
  @Get('get/:id')
  searchSection(@Param('id', ParseIntPipe) id: number) {
    return this.sectionService.searchSection(id);
  }
  @Delete('delete/:id')
  deleteSection(@Param('id', ParseIntPipe) id: number) {
    return this.sectionService.deleteSection(id);
  }
  @Get('manage/:schoolId')
  manageSection(@Param('schoolId', ParseIntPipe) schoolId: number) {
    return this.sectionService.manageSection(schoolId);
  }
  @Patch('update/:id')
  updateSection(
    @Body() dto: SectionUpdateAddDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.sectionService.updateSection(dto, id);
  }
  // @Get(':id')
  // getStudentRanking(@Param('id', ParseIntPipe) id: number) {
  //   return this.sectionService.getStudentRanking(id);
  // }
}
