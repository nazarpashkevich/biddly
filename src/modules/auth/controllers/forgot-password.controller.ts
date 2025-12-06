import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '../../../common/base.controller';
import { ForgotPasswordService } from '../services/forgot-password.service';
import { AuthService } from '../services/auth.service';
import { ApiOkResponseDto } from '../../../common/dto/api-ok-response.dto';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ApiResponseDto } from '../../../common/dto/api-response.dto';
import { JwtAuthDto } from '../dto/jwt-auth.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';

@Controller('auth')
@ApiTags('Authentication')
export class ForgotPasswordController extends BaseController {
  constructor(
    private forgotPasswordService: ForgotPasswordService,
    private authService: AuthService
  ) {
    super();
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Send link for password resetting' })
  @ApiOkResponse({
    type: ApiOkResponseDto,
  })
  async forgotPassword(@Body() data: ForgotPasswordDto) {
    await this.forgotPasswordService.forgotPassword(data.email);

    return this.respondOk();
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password' })
  @ApiOkResponse({ type: ApiResponseDto(JwtAuthDto) })
  async resetPassword(@Body() data: ResetPasswordDto) {
    const user = await this.forgotPasswordService.resetPassword(
      data.token,
      data.password
    );

    return this.respondSuccess({
      accessToken: await this.authService.accessToken(user),
    });
  }
}
