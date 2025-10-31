import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Nuxt (localhost:3000) からのアクセスを許可
  app.enableCors({
    origin: 'http://localhost:3000', // フロント側のURL
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000); // ← 3001 にしておくとよい（Nuxtと別ポート）
}
bootstrap();
