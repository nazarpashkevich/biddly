import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { SignUpResponseDto } from './dto/sign-up-response.dto';
import { InvalidCredentialsException } from './exceptions/invalid-credentials.exception';
import { JwtPayloadInterface } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService
  ) {}

  async signUp(email: string, password: string): Promise<SignUpResponseDto> {
    const user = await this.userService.create(email, password);

    const accessToken = await this.accessToken({
      id: user.id,
      email: user.email,
    });

    return {
      accessToken,
    };
  }

  async login(
    email: string,
    password: string
  ): Promise<{ accessToken: string }> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new InvalidCredentialsException();
    }

    const isPasswordValid = await this.userService.validatePassword(
      user,
      password
    );
    if (!isPasswordValid) {
      throw new InvalidCredentialsException();
    }

    return {
      accessToken: await this.accessToken({ id: user.id, email: user.email }),
    };
  }

  public async accessToken(
    payload: JwtPayloadInterface,
    expiresIn?: string
  ): Promise<string> {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn:
        expiresIn || this.configService.get<string>('JWT_EXPIRES_IN', '60m'),
    });
  }
}
