import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Transaction } from './transaction.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];
}
