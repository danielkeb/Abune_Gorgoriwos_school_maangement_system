import { Controller, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, DtoSignin } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signUp/:school_id')
  signUp(
    @Param('school_id', ParseIntPipe) school_Id: number,
    @Body() dto: CreateUserDto,
  ) {
    return this.authService.signUp(school_Id, dto);
  }

  @Post('signin')
  signIn(@Body() dto:DtoSignin ){
  return this.authService.signIn(dto)
  }
}
