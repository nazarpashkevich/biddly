import { Injectable } from '@nestjs/common';
import { emailConfig } from './config/emails.config';
import { TemplateService } from './template.service';
import { AbstractEmailDriver } from './drivers/abstract-email.driver';
import { ConfigService } from '@nestjs/config';
import { MailSendFailedException } from './exceptions/mail-send-failed.exception';

@Injectable()
export class MailService {
  constructor(
    protected driver: AbstractEmailDriver,
    protected configService: ConfigService,
    protected templateService: TemplateService
  ) {}

  public async healthcheck(): Promise<void> {
    const testEmail = this.configService.get<string>('EMAIL_HEALTH_TEST_TO');

    if (typeof testEmail === 'string') {
      // send test email
      await this.driver.send(
        testEmail,
        'Health check!',
        'Congratulations email is working!'
      );
    }
  }

  public async sendResetPasswordEmail(
    token: string,
    email: string
  ): Promise<void> {
    const resetLink = new URL(
      emailConfig.resetPassword.resetPagePath,
      this.configService.get<string>('FRONTEND_URL')
    );
    resetLink.searchParams.set('token', token);

    return this.sendTemplate(
      email,
      emailConfig.resetPassword.subject,
      emailConfig.resetPassword.template,
      {
        resetLink: resetLink.toString(),
      }
    );
  }

  private async sendTemplate(
    to: string,
    subject: string,
    templateName: string,
    variables: Record<string, string>
  ) {
    try {
      const html = await this.templateService.render(templateName, {
        title: subject,
        ...variables,
      });

      // send a generated letter
      await this.driver.send(to, subject, html);
    } catch (error) {
      console.error('Mailgun error:', error);
      throw new MailSendFailedException();
    }
  }
}
