import { Controller, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DtoSignin, DtoStudent } from './dto';
// import { DtoStudent } from 'src/students/dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  //@Post('signUp/:school_id')
  // signUp(
  //   @Param('school_id', ParseIntPipe) school_Id: number,
  //   @Body() dto: CreateUserDto,
  // ) {
  //   return this.authService.signUp(school_Id, dto);
  // }
  @Post('signUp/:school_id')
  signUpStudent(
    @Param('school_id', ParseIntPipe) school_Id: number,
    @Body() dto: DtoStudent,
  ) {
    return this.authService.signUpStudent(school_Id, dto);
  }

  @Post('signin')
  signIn(@Body() dto: DtoSignin) {
    return this.authService.signIn(dto);
  }
}
