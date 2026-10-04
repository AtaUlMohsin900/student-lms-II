import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { DeleteAccountDto } from './dto/delete-account.dto';
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

  @Put('profile')
  async updateProfile(@CurrentUser() user: JwtUser, @Body() dto: UpdateUserDto) {
    const update = await this.usersService.getProfile(user.id)
    return successResponse('Profile updated successfully', { user: update })
  }

  @Post('change-password')
  async changePassword(@CurrentUser() user: JwtUser, @Body() dto: ChangePasswordDto) {
    await this.usersService.changePassword(user.id, dto)
    return successResponse('Password change successfully', {})
  }

  @Delete('account')
  async deleteAccount(@CurrentUser() user: JwtUser, @Body() dto: DeleteAccountDto) {
    await this.usersService.deleteAccount(user.id, dto.password)
    return successResponse('Password change successfully', {})
  }
}
