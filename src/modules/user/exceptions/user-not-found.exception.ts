import { ApiErrorCodeEnum } from 'src/common/constants/api/api-error-code.enum';
import { AbstractReportableException } from 'src/common/exceptions/abstract-reportable.excepton';

export class UserNotFoundException extends AbstractReportableException {
  constructor() {
    super('User Not Found');
  }

  getApiErrorCode(): string {
    return ApiErrorCodeEnum.USER_NOT_FOUND;
  }
}
