import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { BaseController } from '../../common/base.controller';
import { ApiResponseDto } from '../../common/dto/api-response.dto';
import { LotResponseDto } from './dto/lot-response.dto';
import { LotService } from './lot.service';

@ApiTags('Lots')
@Controller('auctions/:auctionId/lots')
export class LotController extends BaseController {
  constructor(protected service: LotService) {
    super();
  }

  @Get()
  @ApiOperation({ summary: 'Get all lots for a specific auction' })
  @ApiOkResponse({
    type: ApiResponseDto(LotResponseDto, { isArray: true }),
    isArray: true,
  })
  async index(@Param('auctionId') auctionId: number) {
    const lots = await this.service.listForAuction(auctionId);

    return this.respondSuccess(plainToInstance(LotResponseDto, lots));
  }

  @Get(':lotId')
  @ApiOperation({ summary: 'Get a specific lot by ID within an auction' })
  @ApiParam({ name: 'lotId', description: 'ID of the lot' })
  @ApiOkResponse({
    type: ApiResponseDto(LotResponseDto, { isArray: true }),
    isArray: true,
  })
  async find(
    @Param('auctionId') auctionId: number,
    @Param('lotId') lotId: number
  ) {
    // @todo should we check if lot belongs?
    const lot = await this.service.findById(lotId);

    if (!lot) {
      throw new NotFoundException();
    }

    return this.respondSuccess(plainToInstance(LotResponseDto, lot));
  }
}
