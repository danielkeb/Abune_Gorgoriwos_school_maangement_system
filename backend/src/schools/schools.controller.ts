import {
  Controller,
  Body,
  Post,
  UseGuards,
  ParseIntPipe,
  Param,
  Patch,
} from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { DtoSchool } from './dto';
import { JwtGuard } from '../auth/guard/jwt.guard';

@UseGuards(JwtGuard)
@Controller('schools')
export class SchoolsController {
  constructor(private schoolService: SchoolsService) {}
  @Post('register')
  schoolRegistered(@Body() dto: DtoSchool) {
    return this.schoolService.schoolRegistered(dto);
  }
  @Patch('update/:id')
  schoolUpdate(@Param('id', ParseIntPipe) id: number, @Body() dto: DtoSchool) {
    return this.schoolService.schoolUpdate(id, dto);
  }
}
