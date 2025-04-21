import Mailgun from 'mailgun.js';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AbstractEmailDriver } from './abstract-email.driver';

@Injectable()
export class MailgunDriver implements AbstractEmailDriver {
  private readonly client: any;
  private readonly domain: string;
  private readonly from: string;

  constructor(private configService: ConfigService) {
    const mailgun = new Mailgun(FormData);

    this.client = mailgun.client({
      username: this.configService.get<string>('MAILGUN_API_USER') || 'api',
      key: this.configService.get<string>('MAILGUN_API_KEY') || '',
    });
    this.domain = this.configService.get<string>('MAILGUN_DOMAIN') || '';
    this.from = this.configService.get<string>('EMAIL_DEFAULT_FROM') || '';
  }

  async send(to: string, subject: string, text: string): Promise<void> {
    try {
      const response = await this.client.messages.create(this.domain, {
        from: this.from,
        to,
        subject,
        html: text,
      });
      console.info('Mail sent:', response);
    } catch (error) {
      console.error('Error sending mail:', error);
      throw error;
    }
  }
}
