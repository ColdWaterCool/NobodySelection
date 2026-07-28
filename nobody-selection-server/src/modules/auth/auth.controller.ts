import { Controller, Post, Body, Get, Req, UseGuards, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { SmsLoginDto } from './dto/sms-login.dto';
import { PasswordLoginDto } from './dto/password-login.dto';
import { DevLoginDto } from './dto/dev-login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

function getClientIp(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  if (Array.isArray(forwarded) && forwarded.length > 0) {
    return forwarded[0];
  }
  return req.ip || 'unknown';
}

@ApiTags('认证模块')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('send-sms')
  @ApiOperation({ summary: '发送短信验证码' })
  async sendSms(@Body('phone') phone: string) {
    await this.authService.sendSmsCode(phone);
    return { message: '验证码发送成功' };
  }

  @Post('sms-login')
  @ApiOperation({ summary: '短信验证码登录/注册' })
  async smsLogin(@Body() smsLoginDto: SmsLoginDto, @Req() req: Request) {
    return this.authService.smsLogin(smsLoginDto, getClientIp(req));
  }

  @Post('password-login')
  @ApiOperation({ summary: '密码登录' })
  async passwordLogin(@Body() passwordLoginDto: PasswordLoginDto, @Req() req: Request) {
    return this.authService.passwordLogin(passwordLoginDto, getClientIp(req));
  }

  @Get('wechat')
  @ApiOperation({ summary: '获取微信授权URL' })
  getWechatAuthUrl(@Req() req: Request) {
    const state = req.query.state as string;
    return { url: this.authService.getWechatAuthUrl(state) };
  }

  @Get('wechat/callback')
  @ApiOperation({ summary: '微信回调处理' })
  async wechatCallback(@Req() req: Request) {
    const code = req.query.code as string;
    return this.authService.wechatCallback(code, getClientIp(req));
  }

  @Post('refresh')
  @ApiOperation({ summary: '刷新Token' })
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '退出登录' })
  async logout(@Req() req: Request & { user: { id: number } }) {
    await this.authService.logout(req.user.id);
    return { message: '退出成功' };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取当前用户信息' })
  async getCurrentUser(@Req() req: Request & { user: { id: number } }) {
    return this.authService.getCurrentUser(req.user.id);
  }

  @Post('dev-login')
  @ApiOperation({ summary: '开发者快速登录（仅开发环境）' })
  async devLogin(@Body() devLoginDto: DevLoginDto, @Req() req: Request) {
    const nodeEnv = this.configService.get<string>('NODE_ENV', 'development');
    if (nodeEnv === 'production') {
      throw new ForbiddenException('生产环境不允许使用开发登录');
    }

    return this.authService.devLogin(devLoginDto, getClientIp(req));
  }
}
