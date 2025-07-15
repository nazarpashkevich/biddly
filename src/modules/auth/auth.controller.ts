import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { BaseController } from 'src/common/base.controller';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { AuthService } from './auth.service';
import { JwtAuthDto } from './dto/jwt-auth.dto';
import { LoginDto } from './dto/login.dto';
import { SignUpResponseDto } from './dto/sign-up-response.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { VerifyEmailResponseDto } from './dto/verify-email-response.dto';

@ApiTags('Authentication')
@Controller('auth')
@ApiExtraModels(JwtAuthDto, SignUpResponseDto, VerifyEmailResponseDto)
export class AuthController extends BaseController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  @Post('sign-in')
  @ApiOperation({ summary: 'Login user and return JWT token' })
  @ApiOkResponse({ type: ApiResponseDto(JwtAuthDto) })
  async login(@Body() loginDto: LoginDto) {
    const token = await this.authService.login(
      loginDto.email,
      loginDto.password
    );

    return this.respondSuccess({
      access_token: token,
    });
  }

  @Post('sign-up')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiOkResponse({ type: ApiResponseDto(SignUpResponseDto) })
  async signUp(@Body() data: SignUpDto) {
    const token = await this.authService.signUp(data);

    return this.respondSuccess({
      access_token: token,
    });
  }
}
