/* eslint-disable @typescript-eslint/no-unused-vars */
// schools.controller.ts
// import {
//   Controller,
//   Body,
//   Post,
//   UseGuards,
//   ParseIntPipe,
//   Param,
//   Patch,
// } from '@nestjs/common';
// import { SchoolsService } from './schools.service';
// import { DtoSchool } from './dto';
// import { JwtGuard } from '../auth/guard/jwt.guard';
// import { Roles } from '../auth/decorator/roles.decorator';

// @UseGuards(JwtGuard)
// @Controller('schools')
// export class SchoolsController {
//   constructor(private schoolService: SchoolsService) {}

//   @Post('register')
//   @Roles('super Admin') // Specify the roles required for this route
//   schoolRegistered(@Body() dto: DtoSchool) {
//     return this.schoolService.schoolRegistered(dto);
//   }

//   @Patch('update/:id')
//   @Roles('super Admin') // Specify the roles required for this route
//   schoolUpdate(@Param('id', ParseIntPipe) id: number, @Body() dto: DtoSchool) {
//     return this.schoolService.schoolUpdate(id, dto);
//   }
// }

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
