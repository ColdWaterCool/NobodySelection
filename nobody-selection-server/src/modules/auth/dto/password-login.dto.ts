import { IsString, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PasswordLoginDto {
  @ApiProperty({ description: '手机号', example: '13800138000' })
  @IsString()
  @Matches(/^1[3-9]\d{9}$/, { message: '手机号格式不正确' })
  phone: string;

  @ApiProperty({ description: '密码', example: 'password123' })
  @IsString()
  @MinLength(6, { message: '密码长度不能少于6位' })
  password: string;
}