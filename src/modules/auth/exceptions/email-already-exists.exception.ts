import { ApiErrorCodeEnum } from 'src/common/constants/api/api-error-code.enum';
import { AuthException } from './auth.exception';

export class EmailAlreadyExistsException extends AuthException {
  constructor() {
    super('User with such email already exists');
  }

  getApiErrorCode(): string {
    return ApiErrorCodeEnum.AUTH_EMAIL_ALREADY_EXISTS;
  }
}
