import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from "nodemailer"
@Injectable()
export class EmailService {
  constructor(private config: ConfigService){}
    sendSecurityAlert(email:string,token:{},id:number) {
        return new Promise((resolve, reject) => {
          var transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
              user: this.config.get('EMAIL_ADDRESS'),
              pass: this.config.get('APP_PASSWORD')
            },
          });
    
    
          const mail_configs = {
            from:this.config.get('EMAIL_ADDRESS'),
            to: email,
            subject:"Password reset link",
            text:`http://localhost:3000/login/reset/pass/${id}/${token}`
          };
          transporter.sendMail(mail_configs, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        
        });
      }
}
