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
import { ApiCreatedResponse, ApiForbiddenResponse, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('schools')
@Controller('schools')
export class SchoolsController {
  constructor(private schoolService: SchoolsService) {}

  @ApiCreatedResponse({ description: 'The record has been successfully created.'})
  @ApiForbiddenResponse({ description: 'Forbidden.'})
  @UseGuards(JwtGuard)
  @Post('register')
  async schoolRegistered(@Body() dto: DtoSchool) {
   return this.schoolService.schoolRegistered(dto);
  }

  @ApiHeader({ name: 'Authorization', required: true }) // Authentication header
  @ApiResponse({ status: 201, description: 'The record has been successfully updated.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Patch('update/:id')
  schoolUpdate(@Param('id', ParseIntPipe) id: number, @Body() dto: DtoSchool) {
    return this.schoolService.schoolUpdate(id, dto);
  }

  @UseGuards(JwtGuard)
  @Get('get')
  schoolsGet(){
    return this.schoolService.schoolsGet();
  }
  @Get("get/:id")

  getSchoolById(@Param('id', ParseIntPipe) id:number){
      return this.schoolService.getSchoolById(id)
  }
}
