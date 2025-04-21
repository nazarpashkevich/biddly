import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { AuthGuard } from './guards/auth.guard';
import { UserModule } from '../user/user.module';
import { ForgotPasswordController } from './forgot-password.controller';
import { ForgotPasswordService } from './forgot-password.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [AuthController, ForgotPasswordController],
  providers: [AuthService, AuthGuard, ForgotPasswordService],
  imports: [forwardRef(() => UserModule), JwtModule, PrismaModule, MailModule],
  exports: [AuthGuard, JwtModule],
})
export class AuthModule {}
