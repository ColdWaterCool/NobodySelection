import { IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../user/entities/user.entity';

export class DevLoginDto {
  @ApiProperty({ description: '手机号', example: '13800000001' })
  @IsString()
  phone: string;

  @ApiProperty({ description: '角色', enum: ['student', 'parent', 'teacher', 'admin'] })
  @IsEnum(UserRole)
  role: 'student' | 'parent' | 'teacher' | 'admin';
}