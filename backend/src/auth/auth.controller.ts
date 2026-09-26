import { Controller, Get, Post, Body, Param, HttpStatus, HttpCode, Req, Res, UseGuards } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { successResponse } from '../common/http/response.util';
import { UserEntity } from '../users/entities/user.entity';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';


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
  @UseGuards(GoogleAuthGuard)
  googleAuth() {
    return 'Google login started';
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
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

    const redirectUrl = `${frontend}/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify(userPayload))}`;
    return res.redirect(redirectUrl);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@Req() req: Request & { user: { id: string } }) {
    const data = await this.authService.getCurrentUser(req.user.id);
    return successResponse('User profile retrieved successfully', data);
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: Request & { user: { id: string } }) {
    const data = await this.authService.refreshToken(req.user.id);
    return successResponse('Token refreshed successfully', data);
  }

  @Post('logout')
  async logout() {
    return successResponse('Logout successfully', {
      notes: 'Please remove the token and user from local storage'
    })
  }
}