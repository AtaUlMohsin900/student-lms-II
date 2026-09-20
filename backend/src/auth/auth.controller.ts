import { Controller, Get, Post, Body, Param, HttpStatus, HttpCode, Req, Res, UseGuards } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { successResponse } from '../common/http/response.util';
import { UserEntity } from '../users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';


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
  @UseGuards(AuthGuard('google'))
  googleAuth() {
    return 'Google login started';
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(
    @Req() req: Request & { user: UserEntity },
    @Res() res: Response,
  ) {
    const frontend = process.env.FRONTEND_URL || '';

    if (!req.user) {
      return res.redirect(
        `${frontend}/auth/error?message=${encodeURIComponent('Google authentication failed')}`
      );
    }

    const { token } = await this.authService.getCurrentUser(req.user.id);
    const user = req.user;
    const userPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      profilePictureUrl: user.profilePictureUrl,
      phone: user.phone,
      dateOfBirth: user.dateOfBrith,
      googleId: user.googleId,
      emailVerified: user.emailVerified,
      lastLogin: user.lastLogin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return res.redirect(
      `${frontend}/auth/callback?token=${encodeURIComponent(token)}&user=${encodeURIComponent(JSON.stringify(userPayload))}`
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.authService.getCurrentUser(id);
    return successResponse('User fetched successfully', data);
  }
}