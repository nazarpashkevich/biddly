import { ApiErrorCodeEnum } from 'src/common/constants/api/api-error-code.enum';
import { AbstractReportableException } from '../../../common/exceptions/abstract-reportable.excepton';

export class InvalidCredentialsException extends AbstractReportableException {
  constructor() {
    super('Invalid credentials, please try again');
  }

  getApiErrorCode(): string {
    return ApiErrorCodeEnum.AUTH_INVALID_CREDENTIALS;
  }
}
