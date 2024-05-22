import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  StreamableFile,
  Res,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import type { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { CoursematerialService } from './coursematerial.service';
import { UploadCourse } from './dto/course.dto';
import { RoleGuard } from '../auth/decorator/roles.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { Role } from '../auth/decorator/enums/role.enum';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('coursematerial')
export class CoursematerialController {
  constructor(private courseMaterialService: CoursematerialService) {}

  @UseGuards(JwtGuard, RoleGuard)
  @Roles(Role.MODERATOR)
  @Post('/')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './coursematerial',
        filename: (req, file, cb) => {
          console.log('File received:', file);
          const ext = extname(file.originalname).toLowerCase();
          if (['.pdf', '.doc', '.docx', '.txt'].includes(ext)) {
            cb(null, `${file.fieldname}-${Date.now()}${ext}`);
          } else {
            cb(new Error('File extension is not allowed'), '');
          }
        },
      }),
    }),
  )
  async uploadCourseMaterial(
    @UploadedFile() file: Express.Multer.File,
    @Query('teacherId') teacherId: number,
    @Query('subjectId') subjectId: number,
    @Query('gradeId') gradeId: number,
    @Query('schoolId') schoolId: number,
    @Body() dto: UploadCourse,
  ) {
    console.log('File uploaded:', file);

    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    // console.log(dto, teacherId, subjectId, gradeId);

    // // Ensure required fields are present
    // if (!teacherId || !subjectId || !gradeId || !dto) {
    //   throw new BadRequestException('Missing required fields');
    // }

    // Pass validated data to the service method
    const data = await this.courseMaterialService.uploadCourseMaterial(
      file.path,
      teacherId,
      subjectId,
      gradeId,
      schoolId,
      dto, // Pass description directly to service method
    );
    return data;
  }
  // @UseGuards(JwtGuard, RoleGuard)
  // @Roles(Role.STUDENT)
  @Get('get')
  getStudyMaterials() {
    return this.courseMaterialService.getStudyMaterials();
  }

  // @UseGuards(JwtGuard, RoleGuard)
  // @Roles(Role.STUDENT)
  @Get('/:filename')
  async openPdf(
    @Param('filename') filename: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const filePath = join(process.cwd(), 'coursematerial', `${filename}`);
      const readableStream = createReadStream(filePath);

      // Set response headers
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `inline; filename=${filename}`);

      // Pipe the stream to the response
      readableStream.pipe(res);
    } catch (error) {
      console.error('Error opening PDF:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Error opening PDF');
    }
  }

  // @UseGuards(JwtGuard, RoleGuard)
  // @Roles(Role.STUDENT)
  @Get('download/:filename')
  async downloadMaterial(
    @Param('filename') filename: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    try {
      // const filePath = path.join(__dirname, '..', 'coursematerial', filename);
      const fileStream = createReadStream(join(process.cwd(), 'package.json'));
      res.set({
        'Content-Type': 'application/json',
        'Content-Disposition': 'attachment; filename="package.json"',
      });
      return new StreamableFile(fileStream);
    } catch (error) {
      if (error.status === 404) {
        res.status(404).send({ message: 'File not found' });
      } else {
        res.status(500).send({ message: 'Internal Server Error' });
      }
    }
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Roles(Role.MODERATOR)
  @Delete('delete/:id')
  deleteCourseMaterial(@Param('id', ParseIntPipe) id: number) {
    return this.courseMaterialService.deleteCourseMaterial(id);
  }
}
