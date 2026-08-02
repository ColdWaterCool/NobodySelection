import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export enum UserRole {
  STUDENT = 'student',
  PARENT = 'parent',
  TEACHER = 'teacher',
  ADMIN = 'admin',
  OPERATOR = 'operator',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  BANNED = 'banned',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ length: 20, nullable: true, comment: '手机号' })
  @Index({ unique: true })
  phone: string;

  @Column({ length: 255, nullable: true, comment: '密码（bcrypt加密）' })
  password: string;

  @Column({ length: 50, nullable: true, comment: '昵称' })
  nickname: string;

  @Column({ length: 500, nullable: true, comment: '头像URL' })
  avatar: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STUDENT,
    comment: '角色',
  })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
    comment: '状态',
  })
  status: UserStatus;

  @Column({ length: 50, nullable: true, comment: '微信OpenID' })
  @Index({ unique: true })
  wechat_openid: string;

  @Column({ length: 100, nullable: true, comment: '微信UnionID' })
  wechat_unionid: string;

  @Column({ length: 100, nullable: true, comment: '真实姓名' })
  real_name: string;

  @Column({ length: 18, nullable: true, comment: '身份证号' })
  id_card: string;

  @Column({ nullable: true, comment: '性别：0未知 1男 2女' })
  gender: number;

  @Column({ type: 'date', nullable: true, comment: '出生日期' })
  birthday: Date;

  @Column({ length: 500, nullable: true, comment: '地址' })
  address: string;

  @Column({ length: 100, nullable: true, comment: '学校' })
  school: string;

  @Column({ length: 50, nullable: true, comment: '年级' })
  grade: string;

  @Column({ length: 50, nullable: true, comment: '班级' })
  class_name: string;

  @Column({ nullable: true, comment: '最后登录时间' })
  last_login_at: Date;

  @Column({ length: 50, nullable: true, comment: '最后登录IP' })
  last_login_ip: string;

  @Column({ nullable: false, default: 0, comment: 'Token版本号，用于失效Token' })
  token_version: number;

  @CreateDateColumn({ comment: '创建时间' })
  created_at: Date;

  @UpdateDateColumn({ comment: '更新时间' })
  updated_at: Date;

  // 虚拟字段 - 不存入数据库
  accessToken?: string;
  refreshToken?: string;
}