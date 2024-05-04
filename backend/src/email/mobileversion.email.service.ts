import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as crypto from 'crypto'; // Import crypto module for hashing

@Injectable()
export class ShortcodeEmailService {
  constructor(private config: ConfigService) {}

  sendSecurityAlert(email: string, userId: string) {
    return new Promise((resolve, reject) => {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: this.config.get('EMAIL_ADDRESS'),
          pass: this.config.get('APP_PASSWORD'),
        },
      });

      // Generate a random shortcode (example: 123456)
      const shortcode = Math.floor(100000 + Math.random() * 900000).toString();

      const mailConfigs = {
        from: this.config.get('EMAIL_ADDRESS'),
        to: email,
        subject: 'Password reset shortcode',
        text: `Your password reset shortcode is: ${shortcode}`,
      };

      transporter.sendMail(mailConfigs, function (error, info) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log('Email sent: ' + info.response);

          // Hash the shortcode
          const hashedShortcode = crypto
            .createHmac('sha256', userId) // Assuming userId is your secret key
            .update(shortcode)
            .digest('hex');

          resolve({ hashedShortcode, shortcode });
        }
      });
    });
  }

  verifyShortcode(
    enteredShortcode: string,
    hashedShortcode: string,
    userId: string,
  ) {
    // Verify shortcode
    const enteredHashedShortcode = crypto
      .createHmac('sha256', userId)
      .update(enteredShortcode)
      .digest('hex');

    return enteredHashedShortcode === hashedShortcode;
  }
}
