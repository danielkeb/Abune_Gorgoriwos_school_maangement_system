import { Module } from '@nestjs/common';
import { YearService } from './year.service';
import { YearController } from './year.controller';
import { AccessContorlService } from 'src/shared/access-control.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  providers: [YearService, AccessContorlService],
  controllers: [YearController],
})
export class YearModule {}
