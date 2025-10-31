import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // ← Repositoryを注入
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  async register(data: Partial<User>) {
    const isExistUser = await this.userRepository.findOne({
      where: {
        email: data.email,
      },
    });

    if (isExistUser) {
      throw new UnauthorizedException(
        'このメールアドレスはすでに登録されています',
      );
    }
    if (!data.password) return;
    const hashPassword = await bcrypt.hash(data.password, 10);
    console.log(
      hashPassword,
      'これがハッシュ化したかどうかのconsoleですううううううううう',
    );
    const user = this.userRepository.create({
      name: data.name,
      email: data.email,
      password: hashPassword,
    });
    return this.userRepository.save(user);
  }
}
