import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../user/user.service';
import { JwtPayload } from '../../../common/interfaces/jwt-payload.interface';
import { UserStatus } from '../../user/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET', 'default_secret'),
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.findById(payload.sub);
    
    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }

    if (user.status === UserStatus.BANNED) {
      throw new UnauthorizedException('账号已被封禁');
    }

    if (user.status === UserStatus.INACTIVE) {
      throw new UnauthorizedException('账号未激活');
    }

    // 检查token版本号
    if (user.token_version !== (payload as any).tokenVersion) {
      throw new UnauthorizedException('Token已失效，请重新登录');
    }

    return {
      id: user.id,
      phone: user.phone,
      role: user.role,
      nickname: user.nickname,
      avatar: user.avatar,
    };
  }
}