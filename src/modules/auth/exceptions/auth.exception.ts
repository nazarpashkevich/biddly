import { HttpStatus } from '@nestjs/common';
import { AbstractReportableException } from 'src/common/exceptions/abstract-reportable.excepton';
import { ApiErrorCodeEnum } from 'src/common/constants/api/api-error-code.enum';

export class AuthException extends AbstractReportableException {
  constructor(
    message: string = 'Auth failed, invalid credentials',
    statusCode: HttpStatus = HttpStatus.BAD_REQUEST
  ) {
    super(message, statusCode);
  }

  getApiErrorCode(): string {
    return ApiErrorCodeEnum.AUTH_EXCEPTION;
  }
}
