import { IsString, IsOptional, IsEnum, IsDateString, IsInt, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({ description: '手机号', example: '13800138000' })
  @IsString()
  phone: string;

  @ApiPropertyOptional({ description: '密码' })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiPropertyOptional({ description: '昵称' })
  @IsOptional()
  @IsString()
  nickname?: string;

  @ApiPropertyOptional({ description: '头像URL' })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiPropertyOptional({ description: '角色', enum: UserRole })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiPropertyOptional({ description: '真实姓名' })
  @IsOptional()
  @IsString()
  real_name?: string;

  @ApiPropertyOptional({ description: '身份证号' })
  @IsOptional()
  @IsString()
  id_card?: string;

  @ApiPropertyOptional({ description: '性别：0未知 1男 2女' })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(2)
  gender?: number;

  @ApiPropertyOptional({ description: '出生日期' })
  @IsOptional()
  @IsDateString()
  birthday?: string;

  @ApiPropertyOptional({ description: '地址' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ description: '学校' })
  @IsOptional()
  @IsString()
  school?: string;

  @ApiPropertyOptional({ description: '年级' })
  @IsOptional()
  @IsString()
  grade?: string;

  @ApiPropertyOptional({ description: '班级' })
  @IsOptional()
  @IsString()
  class_name?: string;
}