import { ApiErrorCodeEnum } from 'src/common/constants/api/api-error-code.enum';
import { MailConstants } from '../constants/mail.constants';
import { MailException } from './mail.exception';

export class MailSendFailedException extends MailException {
  constructor() {
    super(MailConstants.MESSAGES.EMAIL_SEND_FAILED);
  }

  getApiErrorCode(): string {
    return ApiErrorCodeEnum.EMAIL_SEND_FAILED;
  }
}
