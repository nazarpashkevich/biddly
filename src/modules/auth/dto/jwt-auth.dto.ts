import { ApiProperty } from '@nestjs/swagger';

export class JwtAuthDto {
  @ApiProperty()
  accessToken: string;
}
