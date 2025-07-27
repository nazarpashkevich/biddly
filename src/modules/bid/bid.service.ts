import { Injectable } from '@nestjs/common';
import { Bid, Lot, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBidDto } from './dto/create-bid.dto';

@Injectable()
export class BidService {
  constructor(protected prisma: PrismaService) {}

  public getForLot(lotId: number): Promise<Bid[]> {
    return this.prisma.bid.findMany({ where: { lotId } });
  }

  public async create(
    lot: Lot,
    user: Pick<User, 'id'>,
    data: CreateBidDto
  ): Promise<void> {
    await this.prisma.bid.create({
      data: { lotId: lot.id, userId: user.id, ...data },
    });
  }
}
