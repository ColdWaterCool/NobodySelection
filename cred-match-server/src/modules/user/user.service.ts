import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole, UserStatus } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.findByPhone(createUserDto.phone);
    if (existingUser) {
      throw new ConflictException('该手机号已注册');
    }

    const user = this.userRepository.create(createUserDto);
    
    if (createUserDto.password) {
      user.password = await bcrypt.hash(createUserDto.password, 10);
    }

    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      select: ['id', 'phone', 'nickname', 'avatar', 'role', 'status', 'created_at'],
    });
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('用户不存在');
    }
    return user;
  }

  async findByPhone(phone: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { phone } });
  }

  async findByWechatOpenid(openid: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { wechat_openid: openid } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async updateLastLogin(id: number, ip: string): Promise<void> {
    await this.userRepository.update(id, {
      last_login_at: new Date(),
      last_login_ip: ip,
    });
  }

  async updatePassword(id: number, password: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.userRepository.update(id, { password: hashedPassword });
  }

  async incrementTokenVersion(id: number): Promise<void> {
    await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ token_version: () => 'token_version + 1' })
      .where('id = :id', { id })
      .execute();
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    if (!user.password) {
      return false;
    }
    return bcrypt.compare(password, user.password);
  }

  async bindWechatOpenid(userId: number, openid: string, unionid?: string): Promise<User> {
    const user = await this.findById(userId);
    user.wechat_openid = openid;
    if (unionid) {
      user.wechat_unionid = unionid;
    }
    return this.userRepository.save(user);
  }

  async createOrUpdateByWechat(userInfo: {
    openid: string;
    unionid?: string;
    nickname?: string;
    avatar?: string;
  }): Promise<User> {
    let user = await this.findByWechatOpenid(userInfo.openid);
    
    if (user) {
      if (userInfo.nickname) user.nickname = userInfo.nickname;
      if (userInfo.avatar) user.avatar = userInfo.avatar;
      return this.userRepository.save(user);
    }

    user = this.userRepository.create({
      wechat_openid: userInfo.openid,
      wechat_unionid: userInfo.unionid,
      nickname: userInfo.nickname || '微信用户',
      avatar: userInfo.avatar,
      role: UserRole.STUDENT,
      status: UserStatus.ACTIVE,
    });
    
    return this.userRepository.save(user);
  }
}