import { Module } from '@nestjs/common';
import { AuctionModule } from '../auction/auction.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { BidController } from './bid.controller';
import { BidService } from './bid.service';

@Module({
  controllers: [BidController],
  providers: [BidService],
  imports: [UserModule, AuctionModule, PrismaModule],
})
export class BidModule {}
