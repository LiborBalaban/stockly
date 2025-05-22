import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    // Nastavení pro Nodemailer (pro Gmail v tomto příkladu)
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com', // Tvůj email
        pass: 'your-email-password', // Tvůj email password
      },
    });
  }

  // Metoda pro odeslání emailu
  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    const info = await this.transporter.sendMail({
      from: 'your-email@gmail.com', // Odesílatel
      to, // Příjemce
      subject, // Předmět
      text, // Tělo emailu
    });
    console.log('Email sent: ' + info.response);
  }
}