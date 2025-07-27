import { ApiProperty } from '@nestjs/swagger';

export class BidResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the bid',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Amount of the bid',
    example: '2000',
  })
  amount: number;

  @ApiProperty({
    description: 'Date and time when the bid was created',
    example: '2025-08-10T18:00:00Z',
  })
  createdAt: string;
}
