import {
  Controller,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  //Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { DtoAdmin, DtoSignin, DtoStudent } from './dto';
//import { Response, response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DtoUpdateUser } from './dto/dto.update';
import { extname } from 'path';
// import { DtoStudent } from 'src/students/dto';
//import { Response } from 'express';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //super admin registration
  @Post('signup/admin')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const ext = extname(file?.originalname).toLowerCase();
          if (['.jpg', '.png', '.jpeg'].includes(ext)) {
            cb(null, `${file?.fieldname}-${Date.now()}${ext}`);
          } else {
            cb(new Error('File extension is not allowed'), null);
          }
        },
      }),
    }),
  )
  async signUpAdmin(
    @Body() dto: DtoAdmin,
    @UploadedFile() photo?: Express.Multer.File,
  ) {
    console.log('dto:', dto);
    console.log('photo:', photo);
    let photoPath = null;
    if (photo) {
      photoPath = photo.path;
    }
    try {
      return this.authService.signUpSuperAdmin(dto, photoPath);
    } catch (error) {
      console.error(error);
      throw new BadRequestException(
        'An error occurred while signing up the admin',
      );
    }
  }

  @Post('user/:school_id/:gradeId/:sectionId')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const ext = extname(file?.originalname).toLowerCase();
          if (['.jpg', '.png', '.jpeg'].includes(ext)) {
            cb(null, `${file?.fieldname}-${Date.now()}${ext}`);
          } else {
            cb(new Error('File extension is not allowed'), null);
          }
        },
      }),
    }),
  )
  signUpUser(
    @Body() dto: DtoStudent,
    @UploadedFile() photo: Express.Multer.File,
    @Param('school_id', ParseIntPipe) school_id: number,
    @Param('gradeId', ParseIntPipe) gradeId: number,
    @Param('sectionId', ParseIntPipe) sectionId: number,
  ) {
    console.log('photo uploaded:', photo);

    let photoPath = null;
    if (photo) {
      photoPath = photo.path;
    }

    return this.authService.signUpUser(dto, photoPath, school_id, gradeId, sectionId);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'sign in' })
  @ApiResponse({
    description: 'The news has been successfully logged.',
  })
  @Post('signin')
  signIn(@Body() dto: DtoSignin) {
    return this.authService.signIn(dto);
  }

  @Post('forget')
  async forgetPassword(@Body() dto: any) {
    return this.authService.forgetPassword(dto);
  }
  @Post('forget/shortcode')
  async forgetPasswordShortCode(@Body() dto: any) {
    return this.authService.forgetPasswordShortCode(dto);
  }

  @Post('reset/pass/:id/:token')
  async resetPassword(
    @Body() dto: any,
    @Param('id', ParseIntPipe) id: number,
    @Param('token') token: any,
  ) {
    return this.authService.resetPassword(dto, id, token);
  }

  @Get('role/:role')
  getUsers(@Param('role') role: string) {
    return this.authService.getUsers(role);
  }
  @Get('get')
  getAdmin() {
    return this.authService.getAdmin();
  }
  @Get('user/:id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.authService.getUser(id);
  }

  @Get('user_detail/:id/:role')
  getUserDetail( @Param('id', ParseIntPipe) id: number,
  @Param('role') role: string
  ){
    return this.authService.getUserDetail(id, role)
  }
  @Patch('user_update/:id')
  updateUser( @Param('id', ParseIntPipe) id: number,
  @Body() dto:DtoUpdateUser ,
  
  ){
    return this.authService.updateUser(id,dto )
  }
}
