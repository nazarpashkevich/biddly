import { Controller } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { AuthConstants } from './constants/auth.constants';
import { ForgotPasswordConstants } from './constants/forgot-password.constants';
import { ExpiredResetTokenException } from './exceptions/expired-reset-token.exception';
import { InvalidResetTokenException } from './exceptions/invalid-reset-token.exception';

@Controller('auth')
export class ForgotPasswordService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService
  ) {}

  async forgotPassword(email: string): Promise<void> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      // doing nothing
      return;
    }

    const token = await this.createTokenForUser(user);

    // @todo
    // await this.mailService.sendResetPasswordEmail(token, user.email);
  }

  async resetPassword(token: string, newPassword: string): Promise<User> {
    try {
      const user = await this.userByToken(token);

      const password = await bcrypt.hash(
        newPassword,
        AuthConstants.password.saltRounds
      );

      await Promise.all([
        this.userService.update(user, { password }),
        this.deleteToken(token),
      ]);

      return user;
    } catch (error) {
      if (error instanceof ExpiredResetTokenException) {
        await Promise.all([
          this.deleteToken(token),
          this.forgotPassword(error.email),
        ]);
      }
      throw error;
    }
  }

  async createTokenForUser(user: User): Promise<string> {
    const token = randomBytes(ForgotPasswordConstants.tokenLength).toString(
      'hex'
    );

    await this.prismaService.resetPasswordToken.create({
      data: {
        userId: user.id,
        token,
        expiresAt: new Date(
          Date.now() + ForgotPasswordConstants.tokenExpiresIn
        ),
      },
    });

    return token;
  }

  async userByToken(token: string): Promise<User> {
    const tokenEntry = await this.prismaService.resetPasswordToken.findFirst({
      where: { token },
    });

    if (!tokenEntry) {
      throw new InvalidResetTokenException();
    }

    if (tokenEntry.expiresAt < new Date()) {
      const user = await this.userService.findById(tokenEntry.userId);
      if (!user) {
        throw new InvalidResetTokenException();
      }
      throw new ExpiredResetTokenException(user.email);
    }

    const user = await this.userService.findById(tokenEntry.userId);

    if (!user) {
      throw new InvalidResetTokenException();
    }

    return user;
  }

  protected async deleteToken(token: string): Promise<void> {
    await this.prismaService.resetPasswordToken.delete({
      where: { token },
    });
  }
}
