import { Controller, Get, Post, Body, Param, HttpStatus, HttpCode, Patch, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { successResponse } from '../common/http/response.util';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  async signup(@Body() dto: SignupDto) {
    const data = await this.authService.signup(dto);
    return successResponse('User registered successfully', data);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto) {
    const data = await this.authService.login(dto);
    return successResponse('Login successfully', data);
  }

  @Get('google')
  googleAuth() {
    return 'Google login started';
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.authService.findOne(+id);
    return successResponse('User fetched successfully', data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAuthDto: any) {
    const data = await this.authService.update(+id, updateAuthDto);
    return successResponse('User updated successfully', data);
  }
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.authService.remove(+id);
    return successResponse('User deleted successfully', data);
  }
}