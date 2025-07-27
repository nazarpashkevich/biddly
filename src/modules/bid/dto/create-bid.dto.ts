import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class CreateBidDto {
  @ApiProperty({
    example: 1500,
    description: 'Bid amount. Must be a positive number.',
  })
  @IsNumber()
  @IsPositive()
  amount: number;
}
