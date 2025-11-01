import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { User } from 'src/entities/user.entity';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!user)
      throw new UnauthorizedException('メールアドレスが登録されていません');
    const isPsswordValid = await bcrypt.compare(password, user.password);
    if (!isPsswordValid) {
      throw new UnauthorizedException('パスワードが正しくありません');
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' },
    );

    return token;
  }
}
