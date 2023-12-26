import { Controller, Post, Body, Param, ParseIntPipe,Get,Header, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DtoSignin, DtoStudent } from './dto';
import { Response, response } from 'express';
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
  async signIn(@Body() dto: DtoSignin, @Res({ passthrough: true }) response ) : Promise<any> {
   return  this.authService.signIn(dto);
    // response.cookie('token', token, { httpOnly: true, secure: true ,sameSite: 'lax' ,expires: new Date(Date.now()+10000)});
    


  }

  @Get('ask')
  findAll(@Res({ passthrough: true }) response: Response) {

    
      return {"msg":"you are good"}
  }
}
