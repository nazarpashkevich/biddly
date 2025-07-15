import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HealthcheckException } from './common/exceptions/healthcheck.exception';

@Injectable()
export class AppService {
  constructor(protected configService: ConfigService) {}

  healthcheck(): string {
    return 'OK';
  }

  healthcheckError(): never {
    throw new HealthcheckException();
  }

  public isDevelopment(): boolean {
    return this.getEnvironment() === 'development';
  }

  public isProduction(): boolean {
    return this.getEnvironment() === 'production';
  }

  protected getEnvironment(): string {
    const env = this.configService.get<string>('NODE_ENV');
    return env || 'development';
  }
}
