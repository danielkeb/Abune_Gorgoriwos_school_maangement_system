import { Module } from '@nestjs/common';
import { CallanderController } from './callander.controller';
import { CallanderService } from './callander.service';
import { JwtModule } from '@nestjs/jwt';
import { AccessContorlService } from 'src/shared/access-control.service';

@Module({
  controllers: [CallanderController ],
  providers: [CallanderService,AccessContorlService],
  imports: [
    JwtModule.register({}), // Configure JwtModule
  ],
})
export class CallanderModule {}
