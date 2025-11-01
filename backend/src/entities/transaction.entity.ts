import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.entity';
import { User } from './user.entity';

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export enum PaymentType {
  CASH = 'cash', // 現金
  CREDIT_CARD = 'credit_card', // クレジットカード
  BANK_TRANSFER = 'bank_transfer', // 口座振替
}

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: TransactionType })
  type: TransactionType;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  amount: number;

  @ManyToOne(() => Category)
  category: Category;

  @Column({ type: 'enum', enum: PaymentType, nullable: true })
  paymentMethod?: PaymentType;

  @ManyToOne(() => User, (user) => user.transactions)
  user: User;
}
