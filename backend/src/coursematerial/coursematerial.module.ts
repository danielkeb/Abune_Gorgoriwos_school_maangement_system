import { Module } from '@nestjs/common';
import { CoursematerialController } from './coursematerial.controller';
import { CoursematerialService } from './coursematerial.service';
import { AccessContorlService } from '../shared/access-control.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [CoursematerialController],
  providers: [CoursematerialService, AccessContorlService],
  imports: [PrismaModule, JwtModule.register({})],
})
export class CoursematerialModule {}
