import {
  Controller,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Get,
  HttpCode,
  HttpStatus,
  //Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { DtoAdmin, DtoSignin, DtoStudent } from './dto';
//import { Response, response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
// import { DtoStudent } from 'src/students/dto';
//import { Response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //super admin registration
  @Post('signup/admin')
  signUpAdmin(@Body() dto: DtoAdmin) {
    return this.authService.signUpSuperAdmin(dto);
  }

  @Post('user/:school_id')
  signUpStudent(
    @Body() dto: DtoStudent,
    @Param('school_id', ParseIntPipe) school_id: number,
  ) {
    return this.authService.signUpStudent(dto, school_id);
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
  // @Post('signin')
  // async signIn(
  //   @Body() dto: DtoSignin,
  //   //@Res() response: Response,
  // ): Promise<any> {
  //   const token = await this.authService.signIn(dto);
  //   return token;
  // Set the token as a cookie in the response
  // response.cookie('token', token, {
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: 'lax',
  //   expires: new Date(Date.now() + 100000), // Adjust the expiration time as needed
  // });

  // Send a response indicating successful sign-in (if desired)
  //response.status(200).json({ message: 'Sign-in successful' });
  // }
  @Post('forget')
  async forgetPassword(@Body() dto: any) {
    return this.authService.forgetPassword(dto);
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
}
