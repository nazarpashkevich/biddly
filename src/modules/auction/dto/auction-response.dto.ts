import { ApiProperty } from '@nestjs/swagger';

export class AuctionResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the auction',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Name of the auction item',
    example: 'Vintage Car',
  })
  name: string;

  @ApiProperty({
    description: 'Detailed description of the auction item',
    example: 'A well-preserved vintage car from 1960s.',
  })
  description: string;

  @ApiProperty({
    description: 'Starting price of the auction item',
    example: 5000,
  })
  startingPrice: number;

  @ApiProperty({
    description: 'Date and time when the auction starts',
    example: '2025-08-01T10:00:00Z',
  })
  startDate: string;

  @ApiProperty({
    description: 'Date and time when the auction ends',
    example: '2025-08-10T18:00:00Z',
  })
  endDate: string;
}
