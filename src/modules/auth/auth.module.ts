import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { ForgotPasswordController } from './controllers/forgot-password.controller';
import { ForgotPasswordService } from './services/forgot-password.service';
import { AuthGuard } from './guards/auth.guard';

@Module({
  controllers: [AuthController, ForgotPasswordController],
  providers: [AuthService, AuthGuard, ForgotPasswordService],
  imports: [forwardRef(() => UserModule), JwtModule, PrismaModule],
  exports: [AuthGuard, JwtModule, AuthService],
})
export class AuthModule {}
