import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { ApiResponseDto } from '../../common/dto/api-response.dto';
import { AuctionService } from './auction.service';
import { AuctionResponseDto } from './dto/auction-response.dto';

@Controller('auctions')
@ApiTags('Auctions')
export class AuctionController {
  constructor(protected service: AuctionService) {}

  @Get()
  @ApiOperation({ summary: 'Get all auctions' })
  @ApiOkResponse({
    description: 'List of auctions returned successfully.',
    type: ApiResponseDto(AuctionResponseDto, { isArray: true }),
    isArray: true,
  })
  async index() {
    const auctions = await this.service.list();

    return plainToInstance(AuctionResponseDto, auctions);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get auction by ID' })
  @ApiParam({ name: 'id', description: 'Auction ID' })
  @ApiOkResponse({
    description: 'Auction found and returned.',
    type: AuctionResponseDto,
  })
  async find(@Param('id') id: number) {
    const auction = await this.service.findById(id);

    if (!auction) {
      throw new NotFoundException();
    }

    return plainToInstance(AuctionResponseDto, auction);
  }
}
