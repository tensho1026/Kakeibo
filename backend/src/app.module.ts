import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserModule } from './modules/user/user.module';
import { Test } from './entities/test.entity';
import { AuthModule } from './modules/auth/auth.module';
import { MeModule } from './modules/me/me.module';

@Module({
  controllers: [AppController],
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'mysql',
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [User, Test],
      synchronize: true, // 開発中のみ
    }),
    UserModule,
    AuthModule,
    MeModule,
  ],
})
export class AppModule {}
