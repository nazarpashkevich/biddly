import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { AuctionModule } from './modules/auction/auction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
      serveRoot: '/',
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    AdminModule,
    AuctionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
