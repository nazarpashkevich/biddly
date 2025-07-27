import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { JwtUserDto } from './dto/jwt-user.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { InvalidCredentialsException } from './exceptions/invalid-credentials.exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService
  ) {}

  async signUp(data: SignUpDto): Promise<string> {
    const user = await this.userService.create(data);

    return this.accessToken(user);
  }

  async login(email: string, password: string): Promise<string> {
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

    return this.accessToken(user);
  }

  public async accessToken(
    user: { id: number; email: string },
    expiresIn?: string
  ): Promise<string> {
    return this.jwtService.sign(
      {
        id: user.id,
        email: user.email,
      } as JwtUserDto,
      {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn:
          expiresIn || this.configService.get<string>('JWT_EXPIRES_IN', '60m'),
      }
    );
  }
}
