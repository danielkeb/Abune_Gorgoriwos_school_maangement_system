import { Global, Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ConfigService } from '@nestjs/config';
import { ShortcodeEmailService } from './mobileversion.email.service';
import { PasswordResetController } from './email.cotroller';

@Global()
@Module({
  providers: [EmailService, ShortcodeEmailService, ConfigService],
  exports: [EmailService, ShortcodeEmailService],
  controllers: [PasswordResetController],
})
export class EmailModule {}
