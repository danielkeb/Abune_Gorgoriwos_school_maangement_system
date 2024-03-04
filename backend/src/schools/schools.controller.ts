import {
  Controller,
  Body,
  Post,
  UseGuards,
  ParseIntPipe,
  Patch,
  Param,
  Get,
} from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { DtoSchool } from './dto';
import { JwtGuard } from '../auth/guard/jwt.guard';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiHeader,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RoleGuard } from '../auth/decorator/roles.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { Role } from '../auth/decorator/enums/role.enum';

@ApiTags('schools')
@Controller('schools')
export class SchoolsController {
  constructor(private schoolService: SchoolsService) {}

  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @UseGuards(JwtGuard, RoleGuard)
  @Roles(Role.SUPERUSER)
  @Post('register/:id')
  async schoolRegistered(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: DtoSchool,
  ) {
    return this.schoolService.schoolRegistered(id, dto);
  }

  @ApiHeader({ name: 'Authorization', required: true }) // Authentication header
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Patch('update/:id')
  schoolUpdate(@Param('id', ParseIntPipe) id: number, @Body() dto: DtoSchool) {
    return this.schoolService.schoolUpdate(id, dto);
  }

  //@UseGuards(JwtGuard)
  @Get('get')
  schoolsGet() {
    return this.schoolService.schoolsGet();
  }
  @Get('get/:id')
  getSchoolById(@Param('id', ParseIntPipe) id: number) {
    return this.schoolService.getSchoolById(id);
  }
}
