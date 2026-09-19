import { Controller, Get, Post, Body, Param, HttpStatus, HttpCode } from '@nestjs/common';
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
    const data = await this.authService.getCurrentUser(id);
    return successResponse('User fetched successfully', data);
  }
}