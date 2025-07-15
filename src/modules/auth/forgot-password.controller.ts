import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '../../common/base.controller';
import { ApiOkResponseDto } from '../../common/dto/api-ok-response.dto';
import { ApiResponseDto } from '../../common/dto/api-response.dto';
import { AuthService } from './auth.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { JwtAuthDto } from './dto/jwt-auth.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ForgotPasswordService } from './forgot-password.service';

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
