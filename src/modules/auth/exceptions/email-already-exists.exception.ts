import { ApiErrorCodeEnum } from 'src/common/constants/api/api-error-code.enum';
import { AbstractReportableException } from '../../../common/exceptions/abstract-reportable.excepton';

export class EmailAlreadyExistsException extends AbstractReportableException {
  constructor() {
    super('Healthcheck exception passed.');
  }

  getApiErrorCode(): string {
    return ApiErrorCodeEnum.AUTH_EMAIL_ALREADY_EXISTS;
  }
}
