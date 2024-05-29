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
        subject: 'Password Reset Link',
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #dddddd; border-radius: 10px;">
          <div style="text-align: center; padding: 10px; background-color: #28a745; border-radius: 10px 10px 0 0; color: white;">
            <h2>Password Reset Request</h2>
          </div>
          <div style="padding: 20px; background-color: #f9f9f9; border-radius: 0 0 10px 10px;">
            <p>Dear User,</p>
            <p>We received a request to reset your password for the Aubne Gorgorious School Management System account associated with this email address. You can reset your password by clicking the link below:</p>
            <p style="text-align: center;">
              <a href="http://localhost:3000/login/reset/pass/${id}/${token}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #28a745; border-radius: 5px; text-decoration: none;">Reset Password</a>
            </p>
            <p>If you did not request a password reset, please ignore this email or contact support if you have any questions.</p>
            <p>Thank you!</p>
            <p>Best regards,<br>Aubne Gorgorious School Management System Team</p>
          </div>
        </div>
        `,
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

  sendRegistrationEmail(email: string, password: string) {

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
        subject: 'Welcome to Our School - Set Your Password',
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #dddddd; border-radius: 10px;">
          <div style="text-align: center; padding: 10px; background-color: #28a745; border-radius: 10px 10px 0 0; color: white;">
            <h2>Welcome to Aubne Gorgorious School Managment System!</h2>
          </div>
          <div style="padding: 20px; background-color: #f9f9f9; border-radius: 0 0 10px 10px;">
            <p>Dear User,</p>
            <p>Your account has been successfully created. Below are your login details:</p>
            <p style="color: #28a745;"><strong>Email:</strong> ${email}</p>
            <p style="color: #28a745;"><strong>Password:</strong> ${password}</p>
            <p>Please keep this information secure and do not share it with anyone.</p>
            <p>Thank you for joining us!</p>
            <p>Best regards,<br>Our Service Team</p>
          </div>
        </div>
      `,
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
