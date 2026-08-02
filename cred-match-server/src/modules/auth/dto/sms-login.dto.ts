import { IsString, Matches, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../../user/entities/user.entity';

export class SmsLoginDto {
  @ApiProperty({ description: '手机号', example: '13800138000' })
  @IsString()
  @Matches(/^1[3-9]\d{9}$/, { message: '手机号格式不正确' })
  phone: string;

  @ApiProperty({ description: '验证码', example: '123456' })
  @IsString()
  @Matches(/^\d{6}$/, { message: '验证码格式不正确' })
  code: string;

  @ApiPropertyOptional({ description: '角色', enum: UserRole })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}