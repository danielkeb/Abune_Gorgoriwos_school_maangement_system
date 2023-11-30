import { Controller, Body, Post } from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { DtoSchool } from './dto';

@Controller('schools')
export class SchoolsController {
  constructor(private schoolService: SchoolsService) {}
  @Post('register')
  schoolRegistered(@Body() dto: DtoSchool) {
    return this.schoolService.schoolRegistered(dto);
  }
}
