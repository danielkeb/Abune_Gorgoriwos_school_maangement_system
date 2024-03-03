import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { YearService } from './year.service';
import { YearDto } from './dto';
import { JwtGuard } from '../auth/guard';
import { RoleGuard } from 'src/auth/decorator/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/auth/decorator/enums/role.enum';

@Controller('year')
export class YearController {
  constructor(private yearService: YearService) {}
  @Post('register/:id')
  @UseGuards(JwtGuard, RoleGuard)
  @Roles(Role.SUPERUSER)
  addYear(@Param('id', ParseIntPipe) id: number, @Body() dto: YearDto) {
    return this.yearService.addYear(id, dto);
  }
}
