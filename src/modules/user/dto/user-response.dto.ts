import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  isVerified: boolean;

  @Exclude()
  password: string;

  @Exclude()
  createdAt: string;

  @Exclude()
  updatedAt: string;
}
