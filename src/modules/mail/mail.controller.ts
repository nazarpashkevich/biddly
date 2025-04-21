import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';
import { BaseController } from 'src/common/base.controller';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('mail')
export class MailController extends BaseController {
  constructor(private readonly mailService: MailService) {
    super();
  }

  @Get('healthcheck')
  @ApiOperation({
    summary: 'Healthcheck',
    description: 'Send healthcheck email message',
  })
  @ApiOkResponse({
    description: 'Healthcheck email sent successfully',
  })
  async healthcheck() {
    await this.mailService.healthcheck();

    return this.respondSuccess();
  }
}
