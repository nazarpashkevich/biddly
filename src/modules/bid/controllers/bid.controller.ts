import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/common/decorators/user.decorator';
import { BaseController } from '../../../common/base.controller';
import { BidService } from '../services/bid.service';
import { LotService } from '../../auction/services/lot.service';
import { ApiResponseDto } from '../../../common/dto/api-response.dto';
import { BidResponseDto } from '../dto/bid-response.dto';
import { CreateBidDto } from '../dto/create-bid.dto';
import { JwtUserDto } from '../../auth/dto/jwt-user.dto';

@ApiTags('Bids')
@Controller('auctions/:auctionId/lots/:lotId/bids')
@ApiParam({ name: 'auctionId', description: 'Auction ID' })
@ApiParam({ name: 'lotId', description: 'Lot ID' })
export class BidController extends BaseController {
  constructor(
    protected service: BidService,
    protected lotService: LotService
  ) {
    super();
  }

  @Get()
  @ApiOperation({ summary: 'Get all bids for a specific lot' })
  @ApiOkResponse({
    description: 'List of bids returned successfully.',
    type: ApiResponseDto(BidResponseDto, { isArray: true }),
    isArray: true,
  })
  async getBids(@Param('lotId') lotId: number) {
    const bids = await this.service.getForLot(lotId);

    return this.respondSuccess(plainToInstance(BidResponseDto, bids));
  }

  @Post()
  @ApiOperation({ summary: 'Create a new bid on a specific lot' })
  @ApiBody({ type: CreateBidDto })
  @ApiOkResponse({
    description: 'Bid created successfully.',
    type: ApiResponseDto(BidResponseDto),
  })
  async create(
    @Body() data: CreateBidDto,
    @User() user: JwtUserDto,
    @Param('lotId') lotId: number
  ) {
    const lot = await this.lotService.findById(lotId);

    if (!lot) {
      throw new NotFoundException();
    }

    await this.service.create(lot, user, data);

    return this.respondCreated();
  }
}
