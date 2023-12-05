import { Module } from '@nestjs/common';
import { MarksheetService } from './marksheet.service';
import { MarksheetController } from './marksheet.controller';

@Module({
  providers: [MarksheetService],
  controllers: [MarksheetController],
})
export class MarksheetModule {}
