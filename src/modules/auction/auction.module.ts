import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AuctionController } from './controllers/auction.controller';
import { AuctionService } from './services/auction.service';
import { LotController } from './controllers/lot.controller';
import { LotService } from './services/lot.service';

@Module({
  controllers: [AuctionController, LotController],
  providers: [AuctionService, LotService],
  exports: [AuctionService, LotService],
  imports: [PrismaModule],
})
export class AuctionModule {}
