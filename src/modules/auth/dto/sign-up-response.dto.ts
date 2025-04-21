import { ApiProperty } from '@nestjs/swagger';

export class SignUpResponseDto {
  @ApiProperty({
    description: 'Access token',
    example: 'access_token',
  })
  accessToken: string | null;
}
