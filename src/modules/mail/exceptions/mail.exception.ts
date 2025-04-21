import { HttpStatus } from '@nestjs/common';
import { ApiErrorCodeEnum } from 'src/common/constants/api/api-error-code.enum';
import { AbstractReportableException } from 'src/common/exceptions/abstract-reportable.excepton';

export class MailException extends AbstractReportableException {
  constructor(
    message: string,
    statusCode: HttpStatus = HttpStatus.BAD_REQUEST
  ) {
    super(message, statusCode);
  }

  getApiErrorCode(): string {
    return ApiErrorCodeEnum.EMAIL_EXCEPTION;
  }
}
