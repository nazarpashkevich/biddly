import { IsNotEmpty, IsString, MinLength, Validate } from 'class-validator';
import { MatchValidation } from 'src/common/validators/match.validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty()
  @IsString()
  token: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsString()
  @Validate(MatchValidation, ['password'])
  passwordConfirmation: string;
}
