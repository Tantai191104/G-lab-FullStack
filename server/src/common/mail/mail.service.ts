import { Injectable } from '@nestjs/common';
import nodemailer, { Transporter } from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: Transporter;

  // Typed biến môi trường
  private readonly SMTP_HOST: string;
  private readonly SMTP_PORT: number;
  private readonly SMTP_SECURE: boolean;
  private readonly SMTP_USER: string;
  private readonly SMTP_PASS: string;
  private readonly SMTP_FROM: string;
  private readonly FRONTEND_URL: string;

  constructor() {
    // Lấy biến môi trường và ép kiểu an toàn
    this.SMTP_HOST = process.env.SMTP_HOST!;
    this.SMTP_PORT = parseInt(process.env.SMTP_PORT!);
    this.SMTP_SECURE = process.env.SMTP_SECURE === 'true';
    this.SMTP_USER = process.env.SMTP_USER!;
    this.SMTP_PASS = process.env.SMTP_PASS!;
    this.SMTP_FROM = process.env.SMTP_FROM!;
    this.FRONTEND_URL = process.env.FRONTEND_URL!;

    // Khởi tạo transporter
    this.transporter = nodemailer.createTransport({
      host: this.SMTP_HOST,
      port: this.SMTP_PORT,
      secure: this.SMTP_SECURE,
      auth: {
        user: this.SMTP_USER,
        pass: this.SMTP_PASS,
      },
    });
  }

  /**
   * Gửi email xác thực
   * @param email Email người nhận
   * @param token Token xác thực
   */
  async sendVerificationEmail(email: string, token: string): Promise<void> {
    const verificationUrl = `${this.FRONTEND_URL}/verify-email?token=${token}`;

    try {
      // Typing rõ ràng info để tránh ESLint unsafe
      await this.transporter.sendMail({
        from: `"MyApp" <${this.SMTP_FROM}>`,
        to: email,
        subject: 'Verify your email',
        html: `
<div style="font-family: 'Segoe UI', Arial, sans-serif; color: #222; background: #f4f6fb; padding: 32px;">
  <div style="max-width: 480px; margin: auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.07); padding: 32px;">
    <h2 style="color: #4CAF50; margin-bottom: 16px; font-weight: 600;">Welcome to MyApp!</h2>
    <p style="font-size: 16px; margin-bottom: 24px;">Hi,</p>
    <p style="font-size: 16px; margin-bottom: 24px;">
      Please click the button below to verify your email address and activate your account.
    </p>
    <div style="text-align: center; margin-bottom: 32px;">
      <a href="${verificationUrl}" style="display: inline-block; padding: 14px 32px; font-size: 17px; color: #fff; background: linear-gradient(90deg,#4CAF50 0%,#43a047 100%); border-radius: 8px; text-decoration: none; font-weight: 500; box-shadow: 0 2px 6px rgba(76,175,80,0.15); transition: background 0.2s;">
        Verify Email
      </a>
    </div>
    <p style="font-size: 14px; color: #888; text-align: center;">
      This link will expire in 24 hours.<br>
      If you did not request this, please ignore this email.
    </p>
    <hr style="margin: 32px 0; border: none; border-top: 1px solid #eee;">
    <p style="font-size: 12px; color: #bbb; text-align: center;">
      &copy; ${new Date().getFullYear()} MyApp. All rights reserved.
    </p>
  </div>
</div>
  `,
      });
    } catch (err) {
      if (err instanceof Error) {
        console.error('Error sending email:', err.message);
      } else {
        console.error('Unknown error sending email:', err);
      }
    }
  }

  /**
   * Kiểm tra cấu hình SMTP
   */
  async verifySMTPConnection(): Promise<void> {
    try {
      await this.transporter.verify();
      console.log('SMTP connection successful!');
    } catch (err) {
      console.error('SMTP connection failed:', err);
    }
  }
}
