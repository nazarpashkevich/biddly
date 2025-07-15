import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  Validate,
} from 'class-validator';
import { MatchValidation } from 'src/common/validators/match.validator';
import { AuthConstants } from '../constants/auth.constants';

export class SignUpDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @IsNotEmpty()
  @Matches(AuthConstants.validation.emailRegex)
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'Password123!',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(AuthConstants.validation.passwordRegex)
  password: string;

  @ApiProperty()
  @IsString()
  @Validate(MatchValidation, ['password'])
  passwordConfirmation: string;
}
