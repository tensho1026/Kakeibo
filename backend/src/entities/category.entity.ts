import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: TransactionType })
  type: TransactionType;
}
