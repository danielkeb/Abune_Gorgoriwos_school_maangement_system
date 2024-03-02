import { Module } from '@nestjs/common';
import { SchoolsController } from './schools.controller';
import { SchoolsService } from './schools.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AccessContorlService } from 'src/shared/access-control.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [SchoolsController],
  providers: [SchoolsService, AccessContorlService],
  imports: [PrismaModule, JwtModule.register({})],
})
export class SchoolsModule {}
