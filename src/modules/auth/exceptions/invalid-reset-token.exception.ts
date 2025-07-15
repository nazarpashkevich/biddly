import { ApiErrorCodeEnum } from '../../../common/constants/api/api-error-code.enum';
import { AbstractReportableException } from '../../../common/exceptions/abstract-reportable.excepton';

export class InvalidResetTokenException extends AbstractReportableException {
  constructor() {
    super('Invalid reset token, please try again');
  }

  getApiErrorCode(): string {
    return ApiErrorCodeEnum.AUTH_INVALID_RESET_TOKEN;
  }
}
