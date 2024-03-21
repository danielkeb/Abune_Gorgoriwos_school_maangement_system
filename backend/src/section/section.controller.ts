import {
  Body,
  Controller,
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

  @Post('add')
  addSection(@Body() dto: SectionAddDto) {
    return this.sectionService.addSection(dto);
  }

  @Get('get/:id/students')
  getSection(@Param('id', ParseIntPipe) id: number) {
    return this.sectionService.getSection(id);
  }
  @Get('get/:id')
  searchSection(@Param('id', ParseIntPipe) id: number) {
    return this.sectionService.getSection(id);
  }
  @Get('manage')
  manageSection() {
    return this.sectionService.manageSection();
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
