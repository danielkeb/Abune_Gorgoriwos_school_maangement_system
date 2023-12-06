import { Module } from '@nestjs/common';
import { GradeLevelController } from './grade-level.controller';
import { GradeLevelService } from './grade-level.service';

@Module({
  controllers: [GradeLevelController],
  providers: [GradeLevelService],
})
export class GradeLevelModule {}
