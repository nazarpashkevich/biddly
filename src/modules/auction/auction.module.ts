import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AuctionController } from './auction.controller';
import { AuctionService } from './auction.service';
import { LotController } from './lot.controller';
import { LotService } from './lot.service';

@Module({
  controllers: [AuctionController, LotController],
  providers: [AuctionService, LotService],
  imports: [PrismaModule],
})
export class AuctionModule {}
