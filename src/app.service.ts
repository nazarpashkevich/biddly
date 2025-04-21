import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(protected configService: ConfigService) {}

  healthcheck(): string {
    return 'OK';
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
