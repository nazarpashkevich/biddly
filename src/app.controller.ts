import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { BaseController } from './common/base.controller';

@Controller()
export class AppController extends BaseController {
  constructor(private readonly appService: AppService) {
    super();
  }

  @Get('healthcheck')
  healthCheck() {
    return this.respondOk(this.appService.healthcheck());
  }

  @Get('healthcheck-error')
  healthCheckError() {
    this.appService.healthcheckError();
  }
}
