import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
  Validate,
} from 'class-validator';
import { MatchValidation } from '../../../common/validators/match.validator';
import { AuthConstants } from '../constants/auth.constants';

export class ResetPasswordDto {
  @ApiProperty()
  @IsString()
  token: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(AuthConstants.validation.passwordRegex)
  password: string;

  @ApiProperty()
  @IsString()
  @Validate(MatchValidation, ['password'])
  passwordConfirmation: string;
}
