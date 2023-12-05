import { Module } from '@nestjs/common';
import { YearService } from './year.service';
import { YearController } from './year.controller';

@Module({
  providers: [YearService],
  controllers: [YearController],
})
export class YearModule {}
