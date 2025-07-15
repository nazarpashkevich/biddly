import { HttpStatus } from '@nestjs/common';
import { ApiErrorCodeEnum } from 'src/common/constants/api/api-error-code.enum';
import { AbstractReportableException } from './abstract-reportable.excepton';

export class HealthcheckException extends AbstractReportableException {
  constructor(
    message: string = 'Healthcheck exception passed.',
    statusCode: HttpStatus = HttpStatus.BAD_REQUEST
  ) {
    super(message, statusCode);
  }

  getApiErrorCode(): string {
    return ApiErrorCodeEnum.HEALTHCHECK;
  }
}
