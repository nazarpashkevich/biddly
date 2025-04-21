import { ApiErrorCodeEnum } from 'src/common/constants/api/api-error-code.enum';
import { AuthException } from './auth.exception';

export class InvalidCredentialsException extends AuthException {
  constructor() {
    super('Auth failed, invalid credentials');
  }

  getApiErrorCode(): string {
    return ApiErrorCodeEnum.AUTH_INVALID_CREDENTIALS;
  }
}
