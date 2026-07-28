import { Injectable, UnauthorizedException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { User, UserRole, UserStatus } from '../user/entities/user.entity';
import { JwtPayload, JwtTokens } from '../../common/interfaces/jwt-payload.interface';
import { SmsLoginDto } from './dto/sms-login.dto';
import { PasswordLoginDto } from './dto/password-login.dto';
import { DevLoginDto } from './dto/dev-login.dto';

@Injectable()
export class AuthService {
  // 模拟短信验证码存储（生产环境应使用Redis）
  private smsCodes: Map<string, { code: string; expires: Date }> = new Map();

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  // 发送短信验证码（模拟实现）
  async sendSmsCode(phone: string): Promise<void> {
    const code = Math.random().toString().slice(2, 8);
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 5);
    this.smsCodes.set(phone, { code, expires });
    console.log(`[SMS] 向 ${phone} 发送验证码: ${code}`);
  }

  // 验证短信验证码
  private verifySmsCode(phone: string, code: string): boolean {
    const smsRecord = this.smsCodes.get(phone);
    if (!smsRecord) {
      throw new BadRequestException('请先发送验证码');
    }
    if (new Date() > smsRecord.expires) {
      this.smsCodes.delete(phone);
      throw new BadRequestException('验证码已过期');
    }
    if (smsRecord.code !== code) {
      throw new BadRequestException('验证码错误');
    }
    this.smsCodes.delete(phone);
    return true;
  }

  // 短信验证码登录/注册
  async smsLogin(smsLoginDto: SmsLoginDto, ip?: string): Promise<{ user: User; tokens: JwtTokens }> {
    const { phone, code, role } = smsLoginDto;
    this.verifySmsCode(phone, code);
    let user = await this.userService.findByPhone(phone);
    if (!user) {
      user = await this.userService.create({
        phone,
        role: role || UserRole.STUDENT,
        nickname: `用户${phone.slice(-4)}`,
      });
    }
    this.checkUserStatus(user);
    await this.userService.updateLastLogin(user.id, ip || 'unknown');
    const tokens = await this.generateTokens(user);
    return { user, tokens };
  }

  // 密码登录
  async passwordLogin(passwordLoginDto: PasswordLoginDto, ip?: string): Promise<{ user: User; tokens: JwtTokens }> {
    const { phone, password } = passwordLoginDto;
    const user = await this.userService.findByPhone(phone);
    if (!user) {
      throw new UnauthorizedException('手机号或密码错误');
    }
    this.checkUserStatus(user);
    const isPasswordValid = await this.userService.validatePassword(user, password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('手机号或密码错误');
    }
    await this.userService.updateLastLogin(user.id, ip || 'unknown');
    const tokens = await this.generateTokens(user);
    return { user, tokens };
  }

  // 获取微信授权URL
  getWechatAuthUrl(state?: string): string {
    const appId = this.configService.get<string>('WECHAT_APP_ID', 'wx_demo_app_id');
    const redirectUri = encodeURIComponent(this.configService.get<string>('WECHAT_REDIRECT_URI', 'http://localhost:3000/api/auth/wechat/callback'));
    const stateParam = state || 'default';
    return `https://open.weixin.qq.com/connect/qrconnect?appid=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_login&state=${stateParam}#wechat_redirect`;
  }

  // 微信回调处理
  async wechatCallback(code: string, ip?: string): Promise<{ user: User; tokens: JwtTokens }> {
    if (!code) {
      throw new BadRequestException('缺少微信授权码');
    }
    const wechatUserInfo = await this.getWechatUserInfo(code);
    const user = await this.userService.createOrUpdateByWechat({
      openid: wechatUserInfo.openid,
      unionid: wechatUserInfo.unionid,
      nickname: wechatUserInfo.nickname,
      avatar: wechatUserInfo.avatar,
    });
    this.checkUserStatus(user);
    await this.userService.updateLastLogin(user.id, ip || 'unknown');
    const tokens = await this.generateTokens(user);
    return { user, tokens };
  }

  // 模拟获取微信用户信息
  private async getWechatUserInfo(code: string): Promise<any> {
    return {
      openid: `wx_${code}_${Date.now()}`,
      unionid: `union_${code}`,
      nickname: '微信用户',
      avatar: null,
    };
  }

  // 刷新Token
  async refreshToken(refreshToken: string): Promise<JwtTokens> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_SECRET', 'default_secret'),
      });
      const user = await this.userService.findById(payload.sub);
      if (!user) {
        throw new UnauthorizedException('用户不存在');
      }
      this.checkUserStatus(user);
      if (user.token_version !== payload.tokenVersion) {
        throw new UnauthorizedException('Token已失效，请重新登录');
      }
      return this.generateTokens(user);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('无效的刷新令牌');
    }
  }

  // 退出登录
  async logout(userId: number): Promise<void> {
    await this.userService.incrementTokenVersion(userId);
  }

  // 获取当前用户信息
  async getCurrentUser(userId: number): Promise<User> {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }
    const { password, wechat_openid, wechat_unionid, ...result } = user;
    return result as User;
  }

  // 生成JWT Token
  private async generateTokens(user: User): Promise<JwtTokens> {
    const payload: JwtPayload = {
      sub: user.id,
      phone: user.phone,
      role: user.role,
    };
    const payloadWithVersion = {
      ...payload,
      tokenVersion: user.token_version,
    };
    const accessTokenExpiresIn = this.configService.get<string>('JWT_EXPIRES_IN', '2h');
    const refreshTokenExpiresIn = '7d';
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payloadWithVersion, { expiresIn: accessTokenExpiresIn }),
      this.jwtService.signAsync(payloadWithVersion, { expiresIn: refreshTokenExpiresIn }),
    ]);
    const expiresIn = this.parseExpiresIn(accessTokenExpiresIn);
    return {
      accessToken,
      refreshToken,
      expiresIn,
    };
  }

  // 解析过期时间字符串为秒数
  private parseExpiresIn(expiresIn: string): number {
    const match = expiresIn.match(/^(\d+)([smhd])$/);
    if (!match) return 7200;
    const value = parseInt(match[1]);
    const unit = match[2];
    switch (unit) {
      case 's': return value;
      case 'm': return value * 60;
      case 'h': return value * 3600;
      case 'd': return value * 86400;
      default: return 7200;
    }
  }

  // 检查用户状态
  private checkUserStatus(user: User): void {
    if (user.status === UserStatus.BANNED) {
      throw new ForbiddenException('账号已被封禁');
    }

    if (user.status === UserStatus.INACTIVE) {
      throw new ForbiddenException('账号未激活');
    }
  }

  // 开发模式登录（跳过验证码和密码校验）
  async devLogin(devLoginDto: DevLoginDto, ip?: string): Promise<{ user: User; tokens: JwtTokens; id: number; role: string; nickname: string }> {
    const { phone, role } = devLoginDto;

    // 查找用户
    let user = await this.userService.findByPhone(phone);
    
    if (!user) {
      // 创建新用户
      user = await this.userService.create({
        phone,
        role: role as UserRole,
        nickname: `开发${role}${phone.slice(-4)}`,
        password: 'dev_password_123', // 固定密码
      });
    }

    // 更新最后登录信息
    await this.userService.updateLastLogin(user.id, ip || 'unknown');

    // 生成Token
    const tokens = await this.generateTokens(user);

    return { 
      user, 
      tokens,
      id: user.id,
      role: user.role,
      nickname: user.nickname 
    };
  }
}