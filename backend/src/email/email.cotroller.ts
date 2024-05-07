import {
  Controller,
  Post,
  Body,
  ParseIntPipe,
  Param,
  Patch,
} from '@nestjs/common';
import { ShortcodeEmailService } from './mobileversion.email.service';

@Controller('verify')
export class PasswordResetController {
  constructor(private readonly shortcodeEmailService: ShortcodeEmailService) {}

  @Post('/shortcode/:id')
  async verifyCode(@Param('id', ParseIntPipe) id: number, @Body() dto: any) {
    // Verify the entered shortcode
    await this.shortcodeEmailService.verifyCode(id, dto);
    // Return response indicating whether the entered shortcode is correct
  }

  @Patch('/updatePassword/:id')
  async resetPassword(@Param('id', ParseIntPipe) id: number, @Body() dto: any) {
    await this.shortcodeEmailService.resetPassword(id, dto);
  }
}
