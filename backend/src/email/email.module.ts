import { Global, Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  providers: [EmailService,ConfigService],
  exports: [EmailService]
})
export class EmailModule {}
