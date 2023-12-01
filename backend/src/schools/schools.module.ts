import { Module } from '@nestjs/common';
import { SchoolsController } from './schools.controller';
import { SchoolsService } from './schools.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [SchoolsController],
  providers: [SchoolsService, PrismaModule],
  imports: [PrismaModule],
})
export class SchoolsModule {}
