import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { AppService } from 'src/app.service';
import { TemplateService } from './template.service';
import { AbstractEmailDriver } from './drivers/abstract-email.driver';
import { MailgunDriver } from './drivers/mailgun.driver';

@Module({
  providers: [
    MailService,
    AppService,
    TemplateService,
    {
      provide: AbstractEmailDriver,
      useClass: MailgunDriver,
    },
  ],
  controllers: [MailController],
  exports: [MailService],
})
export class MailModule {}
