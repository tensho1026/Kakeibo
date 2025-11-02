import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { Transaction } from 'src/entities/transaction.entity';
import { Category } from 'src/entities/category.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>, // ← Repositoryを注入

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>, // ← Repositoryを注入
  ) {}

  saveTransaction(data: {
    userId: number;
    type: 'income' | 'expense';
    date: Date;
    amount: number;
    categoryId: number;
    paymentMethod?: string;
    memo?: string;
  }) {
    const saveData = this.transactionRepository.create({
      type: data.type,
      date: data.date,
      amount: data.amount,
      paymentMethod: data.paymentMethod,
      memo: data.memo,
      category: { id: data.categoryId } as Category,
      user: { id: data.userId } as User,
    } as DeepPartial<Transaction>);
    return this.transactionRepository.save(saveData);
  }
}
