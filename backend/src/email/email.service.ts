import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  constructor(private config: ConfigService) {}

  sendSecurityAlert(email: string, token: object | unknown, id: number) {
    return new Promise<void>((resolve, reject) => {
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

      const mailConfigs = {
        from: this.config.get('EMAIL_ADDRESS'),
        to: email,
        subject: 'Password reset link',
        text: `http://localhost:3000/login/reset/pass/${id}/${token}`,
      };

      transporter.sendMail(mailConfigs, function (error, info) {
        if (error) {
          console.error('Error sending email:', error);
          reject(error);
        } else {
          console.log('Email sent: ' + info.response);
          resolve();
        }
      });
    });
  }
}
