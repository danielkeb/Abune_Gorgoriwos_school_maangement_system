import { Module } from '@nestjs/common';
import { SchoolsController } from './schools.controller';
import { SchoolsService } from './schools.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [SchoolsController],
  providers: [SchoolsService],
  imports:[PrismaModule]
})
export class SchoolsModule {}
