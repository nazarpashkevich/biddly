import { Injectable } from '@nestjs/common';
import { Auction } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuctionService {
  constructor(protected prisma: PrismaService) {}

  public list(): Promise<Auction[]> {
    return this.prisma.auction.findMany(); // @todo
  }

  public findById(id: number): Promise<Auction | null> {
    return this.prisma.auction.findUnique({ where: { id } });
  }
}
