import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { BaseController } from '../../common/base.controller';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UserResponseDto } from './dto/user-response.dto';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
@UseGuards(AuthGuard)
@ApiBearerAuth('JWT')
@ApiExtraModels(UserResponseDto)
export class UserController extends BaseController {
  constructor(private readonly usersService: UserService) {
    super();
  }

  @Get('me')
  @ApiOperation({ summary: 'Get current user`s data' })
  @ApiOkResponse({
    type: ApiResponseDto(UserResponseDto),
  })
  async me(@Request() req) {
    const user = req.user;
    const userRecord = await this.usersService.me(user);

    return this.respondSuccess(plainToInstance(UserResponseDto, userRecord));
  }
}
