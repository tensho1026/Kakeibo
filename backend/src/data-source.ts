import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { Category } from './entities/category.entity';
import { Transaction } from './entities/transaction.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'user',
  password: process.env.DB_PASS || 'password',
  database: process.env.DB_NAME || 'mydb',
  entities: [User, Category, Transaction],
  synchronize: false,
  logging: false,
});
