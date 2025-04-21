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

@ApiTags('Authentication')
@Controller('/auth')
@ApiExtraModels(JwtAuthDto, SignUpResponseDto)
export class AuthController extends BaseController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user and return JWT token' })
  @ApiOkResponse({ type: ApiResponseDto(JwtAuthDto) })
  async login(@Body() loginDto: LoginDto) {
    const data = await this.authService.login(
      loginDto.email,
      loginDto.password
    );

    return this.respondSuccess(data);
  }

  @Post('/signup')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiOkResponse({ type: ApiResponseDto(SignUpResponseDto) })
  async signUp(@Body() signUpDto: SignUpDto) {
    const { email, password } = signUpDto;

    const data = await this.authService.signUp(email, password);

    return this.respondSuccess(data);
  }
}
