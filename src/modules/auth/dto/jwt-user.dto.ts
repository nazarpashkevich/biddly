import { ApiProperty } from '@nestjs/swagger';

export class JwtUserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;
}
