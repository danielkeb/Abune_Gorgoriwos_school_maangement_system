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
} from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { DtoSchool } from './dto';
import { JwtGuard } from '../auth/guard/jwt.guard';

@Controller('schools')
export class SchoolsController {
  constructor(private schoolService: SchoolsService) {}

  @Post('register')
  async schoolRegistered(@Body() dto: DtoSchool) {
    try {
      // Add validation logic here, for example:
      if (!dto.school_name || !dto.school_address || !dto.school_phone) {
        throw new HttpException(
          'Bad Request: Missing required fields',
          HttpStatus.BAD_REQUEST,
        );
      }

      // If validation passes, proceed with registration
      const result = await this.schoolService.schoolRegistered(dto);

      return { message: 'School registered successfully', data: result };
    } catch (error) {
      // Handle specific errors and return appropriate responses
      if (error instanceof HttpException) {
        throw error; // If it's already an HttpException, rethrow it
      }

      // Handle other errors and return a generic 500 Internal Server Error
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch('update/:id')
  schoolUpdate(@Param('id', ParseIntPipe) id: number, @Body() dto: DtoSchool) {
    return this.schoolService.schoolUpdate(id, dto);
  }
}
