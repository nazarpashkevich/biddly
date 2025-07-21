import { Injectable } from '@nestjs/common';
import { Lot } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LotService {
  constructor(protected prisma: PrismaService) {}

  public listForAuction(auctionId: number): Promise<Lot[]> {
    return this.prisma.lot.findMany({ where: { auctionId } }); // @todo
  }

  public findById(id: number): Promise<Lot | null> {
    return this.prisma.lot.findUnique({ where: { id } });
  }
}
