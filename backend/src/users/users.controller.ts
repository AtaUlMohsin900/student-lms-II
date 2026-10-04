import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import type { JwtUser } from 'src/auth/decorators/current-user.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { successResponse } from 'src/common/http/response.util';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('profile')
  async getProfile(@CurrentUser() user: JwtUser) {
    const profile = await this.usersService.getProfile(user.id)
    return successResponse('profile fetch successfully', { user: profile })
  }

  @Get('profile')
  async updateProfile(@CurrentUser() user: JwtUser, @Body() dto: UpdateUserDto) {
    const update = await this.usersService.getProfile(user.id)
    return successResponse('profile fetch successfully', { user: update })
  }
}
