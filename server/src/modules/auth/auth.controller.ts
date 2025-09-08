import { Controller, Post, Body, Query, Get, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/auth.dto';
import type { JwtPayload } from 'src/types/types';
import type { Response } from 'express';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }
  @Post('signin')
  async signin(@Body() signInDto: SignInDto, @Res({ passthrough: true }) res: Response) {
    const { user, access_token, refresh_token } = await this.authService.signIn(signInDto);

    // Set refresh token vào HTTP-only cookie ở đây
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { user, access_token };
  }
  @Get('verify-email')
  async verifyEmail(@Query('token') token: string) {
    return this.authService.verifyEmail(token);
  }
  @Post('refresh')
  async refresh(@Body() body: { userId: string; refreshToken: string }) {
    return this.authService.refreshTokens(body.userId, body.refreshToken);
  }
  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(
    @CurrentUser<JwtPayload>() user: JwtPayload,
    @Res({ passthrough: true }) res: Response,
  ) {
    // Xóa refresh token ở cookie
    res.clearCookie('refresh_token');
    console.log('Controller user.userId:', user?.userId);
    return this.authService.logout(user.userId);
  }
}
