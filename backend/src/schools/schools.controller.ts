import {
  Controller,
  Body,
  Post,
  HttpException,
  HttpStatus,
  UseGuards,
  ParseIntPipe,
  Patch,
  Param,
  Get,
} from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { DtoSchool } from './dto';
import { JwtGuard } from '../auth/guard/jwt.guard';

@Controller('schools')
export class SchoolsController {
  constructor(private schoolService: SchoolsService) {}

  @Post('register')
  async schoolRegistered(@Body() dto: DtoSchool) {
   return this.schoolService.schoolRegistered(dto);
  }

  @Patch('update/:id')
  schoolUpdate(@Param('id', ParseIntPipe) id: number, @Body() dto: DtoSchool) {
    return this.schoolService.schoolUpdate(id, dto);
  }
  @Get('get')
  schoolsGet(){
    return this.schoolService.schoolsGet();
  }
  @Get("get/:id")

  getSchoolById(@Param('id', ParseIntPipe) id:number){
      return this.schoolService.getSchoolById(id)
  }
}
