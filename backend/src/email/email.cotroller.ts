import { Controller, Post, Body } from '@nestjs/common';
import { ShortcodeEmailService } from './mobileversion.email.service';

@Controller('verify')
export class PasswordResetController {
  constructor(private readonly shortcodeEmailService: ShortcodeEmailService) {}

  @Post('shortcode')
  async verifyShortcode(
    @Body()
    body: {
      enteredShortcode: string;
      hashedShortcode: string;
      userId: string;
    },
  ) {
    const { enteredShortcode, hashedShortcode, userId } = body;

    // Verify the entered shortcode
    const isShortcodeCorrect = this.shortcodeEmailService.verifyShortcode(
      enteredShortcode,
      hashedShortcode,
      userId,
    );

    // Return response indicating whether the entered shortcode is correct
    return { isShortcodeCorrect };
  }
}
