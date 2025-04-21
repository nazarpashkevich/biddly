import { Controller } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UserService } from '../user/user.service';
import { MailService } from 'src/modules/mail/mail.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import { forgotPasswordConfig } from './config/forgot-password.config';
import { InvalidResetTokenException } from './exceptions/invalid-reset-token.exception';

@Controller('auth')
export class ForgotPasswordService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
    private mailService: MailService
  ) {}

  async forgotPassword(email: string): Promise<void> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      // doing nothing
      return;
    }

    const token = await this.createTokenForUser(user);

    await this.mailService.sendResetPasswordEmail(token, user.email);
  }

  async resetPassword(token: string, newPassword: string): Promise<User> {
    const user = await this.userByToken(token);

    const password = await bcrypt.hash(newPassword, 10);

    await this.userService.update(user, { password });

    await this.deleteToken(token);

    return user;
  }

  async createTokenForUser(user: User): Promise<string> {
    const token = randomBytes(forgotPasswordConfig.tokenLength).toString('hex');

    await this.prismaService.resetPasswordToken.create({
      data: {
        userId: user.id,
        token,
        expiresAt: new Date(Date.now() + forgotPasswordConfig.tokenExpiresIn),
      },
    });

    return token;
  }

  async userByToken(token: string): Promise<User> {
    const tokenEntry = await this.prismaService.resetPasswordToken.findFirst({
      where: { token },
    });

    if (!tokenEntry || tokenEntry.expiresAt < new Date()) {
      throw new InvalidResetTokenException();
    }

    const user = await this.userService.findById(tokenEntry.userId);

    if (!user) {
      throw new InvalidResetTokenException();
    }

    return user;
  }

  async deleteToken(token: string): Promise<void> {
    await this.prismaService.resetPasswordToken.delete({
      where: { token },
    });
  }
}
