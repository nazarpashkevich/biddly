import { ApiErrorCodeEnum } from 'src/common/constants/api/api-error-code.enum';
import { AbstractReportableException } from '../../../common/exceptions/abstract-reportable.excepton';

export class ExpiredResetTokenException extends AbstractReportableException {
  constructor(public readonly email: string) {
    super('Reset token has expired');
  }

  getApiErrorCode(): string {
    return ApiErrorCodeEnum.AUTH_EXPIRED_RESET_TOKEN;
  }
}
