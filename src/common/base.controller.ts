import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ApiOkResponseDto } from './dto/api-ok-response.dto';

@Injectable()
export class BaseController {
  protected respondSuccess(data: any = null, message: string = 'Success') {
    return {
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    };
  }

  protected respondOk(message: string = 'Success'): ApiOkResponseDto {
    return {
      success: true,
      message,
      timestamp: new Date().toISOString(),
    };
  }

  protected respondError(
    message: string = 'Error',
    code: number = HttpStatus.BAD_REQUEST
  ) {
    throw new HttpException(
      {
        success: false,
        message,
        timestamp: new Date().toISOString(),
      },
      code
    );
  }

  protected respondNotFound(message: string = 'Not Found') {
    return this.respondError(message, HttpStatus.NOT_FOUND);
  }

  protected respondUnauthorized(message: string = 'Unauthorized') {
    return this.respondError(message, HttpStatus.UNAUTHORIZED);
  }

  protected respondForbidden(message: string = 'Forbidden') {
    return this.respondError(message, HttpStatus.FORBIDDEN);
  }

  protected respondCreated(data: any = null) {
    return {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    };
  }

  protected respondValidationError(message: string = 'Validation Error') {
    return this.respondError(message, HttpStatus.UNPROCESSABLE_ENTITY);
  }

  protected sendNoContent() {
    return null;
  }
}
