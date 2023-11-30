import { Injectable,ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, DtoSignin } from './dto';
import * as argon from 'argon2'

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}
  async signUp(school_id:number, dto: CreateUserDto) {

    const hash= await argon.hash(dto.password)
    const addUser = await this.prismaService.user.create({
      data: {
        school_Id: school_id,
      ...dto,
       password:hash
        
      
      },
    });
    return addUser;
  }


  async signIn(dto:DtoSignin){

    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email
      },
    })
       if(!user) throw new ForbiddenException("User NOt found!");
  
       const pwMatches= await argon.verify(
          user.password,
          dto.password
       )
       if(!pwMatches){
          throw new ForbiddenException("Username or password Incorrect!")
       }
  
      
        return  "User Loged IN"
  
     
    
  
      
        return   user
    
  }
}
