import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

export interface TeacherAvailability {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export enum TeacherAuditStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity('teachers')
export class Teacher {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ unsigned: true, unique: true, comment: '用户ID' })
  user_id: number;

  @Column({ length: 255, nullable: true, comment: '教师简介' })
  bio: string;

  @Column({ length: 255, nullable: true, comment: '教学视频简介' })
  video_intro: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0, comment: '课时费（元/小时）' })
  hourly_rate: number;

  @Column({ type: 'simple-array', nullable: true, comment: '擅长领域标签' })
  specializations: string[];

  @Column({ length: 50, nullable: true, comment: '国籍' })
  nationality: string;

  @Column({ length: 100, nullable: true, comment: '毕业院校' })
  university: string;

  @Column({ length: 100, nullable: true, comment: '专业' })
  major: string;

  @Column({ length: 50, nullable: true, comment: '学历' })
  education: string;

  @Column({ type: 'int', default: 0, comment: '教学年限' })
  teaching_years: number;

  @Column({ type: 'decimal', precision: 3, scale: 1, default: 0, comment: '评分（1-5）' })
  rating: number;

  @Column({ type: 'int', default: 0, comment: '评价数量' })
  review_count: number;

  @Column({ type: 'int', default: 0, comment: '学生数量' })
  student_count: number;

  @Column({ type: 'int', default: 0, comment: '课程数量' })
  course_count: number;

  @Column({ type: 'boolean', default: false, comment: '是否金牌教师' })
  @Index()
  is_gold: boolean;

  @Column({ type: 'boolean', default: false, comment: '是否推荐展示' })
  @Index()
  is_featured: boolean;

  @Column({
    type: 'enum',
    enum: TeacherAuditStatus,
    default: TeacherAuditStatus.PENDING,
    comment: '审核状态',
  })
  @Index()
  audit_status: TeacherAuditStatus;

  @Column({ length: 255, nullable: true, comment: '审核备注' })
  audit_remark: string;

  @Column({ type: 'int', default: 0, comment: '累计收入（分）' })
  total_income: number;

  @Column({ type: 'int', default: 0, comment: '可提现余额（分）' })
  available_balance: number;

  @CreateDateColumn({ comment: '创建时间' })
  created_at: Date;

  @UpdateDateColumn({ comment: '更新时间' })
  updated_at: Date;

  // 虚拟字段 - 不存入数据库
  user_info?: User;
  availability?: TeacherAvailability[];
}