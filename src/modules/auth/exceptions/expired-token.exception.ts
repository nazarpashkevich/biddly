import { HttpStatus } from '@nestjs/common';
import { ApiErrorCodeEnum } from 'src/common/constants/api/api-error-code.enum';
import { AbstractReportableException } from '../../../common/exceptions/abstract-reportable.excepton';

export class ExpiredTokenException extends AbstractReportableException {
  constructor() {
    super('Token has expired', HttpStatus.UNAUTHORIZED);
  }

  getApiErrorCode(): string {
    return ApiErrorCodeEnum.AUTH_EXPIRED_ACCESS_TOKEN;
  }
}
