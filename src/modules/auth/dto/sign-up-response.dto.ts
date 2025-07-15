import { ApiProperty } from '@nestjs/swagger';

export class SignUpResponseDto {
  @ApiProperty({
    description: 'User`s access token',
    example: true,
  })
  access_token: boolean;
}
