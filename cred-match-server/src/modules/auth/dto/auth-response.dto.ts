import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({ description: '访问令牌' })
  accessToken: string;

  @ApiProperty({ description: '刷新令牌' })
  refreshToken: string;

  @ApiProperty({ description: '过期时间（秒）' })
  expiresIn: number;

  @ApiProperty({ description: '用户信息' })
  user: {
    id: number;
    phone: string;
    nickname: string;
    avatar: string;
    role: string;
  };
}