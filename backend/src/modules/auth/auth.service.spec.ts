import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';

// bcrypt / jwt を最初からモック化
jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

describe('AuthService', () => {
  let authService: AuthService;
  let mockUserRepository: any;

  beforeEach(() => {
    mockUserRepository = {
      findOne: jest.fn(),
    };
    authService = new AuthService(mockUserRepository);

    jest.clearAllMocks();
  });

  it('メールアドレスが存在しない場合、UnauthorizedException を投げる', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    mockUserRepository.findOne.mockResolvedValue(null);

    await expect(
      authService.login('test@example.com', 'pass123'),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('パスワードが一致しない場合、UnauthorizedException を投げる', async () => {
    const fakeUser = { id: 1, email: 'test@example.com', password: 'hashedpw' };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    mockUserRepository.findOne.mockResolvedValue(fakeUser);

    (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false);

    await expect(
      authService.login('test@example.com', 'wrongpass'),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('正しいメールとパスワードなら JWT トークンを返す', async () => {
    const fakeUser = { id: 1, email: 'test@example.com', password: 'hashedpw' };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    mockUserRepository.findOne.mockResolvedValue(fakeUser);

    (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);
    (jwt.sign as jest.Mock).mockReturnValueOnce('mocktoken');

    const token = await authService.login('test@example.com', 'pass123');
    expect(token).toBe('mocktoken');
  });
});
