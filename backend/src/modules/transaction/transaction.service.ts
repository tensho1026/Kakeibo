import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { Transaction, TransactionType } from 'src/entities/transaction.entity';
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

  async saveTransaction(data: {
    userId: number;
    type: 'income' | 'expense';
    date: Date;
    amount: number;
    category?: string;
    categoryId?: number;
    paymentMethod?: string;
    memo?: string;
  }) {
    let categoryId = data.categoryId;
    if (!categoryId && data.category) {
      const foundCategory = await this.categoryRepository.findOne({
        where: {
          name: data.category,
        },
      });

      if (foundCategory) {
        categoryId = foundCategory.id;
      } else {
        const newCategory = await this.categoryRepository.save(
          this.categoryRepository.create({
            name: data.category,
            type:
              data.type === 'income'
                ? TransactionType.INCOME
                : TransactionType.EXPENSE,
          }),
        );
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        categoryId = newCategory.id;
      }
      const saveData = this.transactionRepository.create({
        type: data.type,
        date: data.date,
        amount: data.amount,
        paymentMethod: data.paymentMethod,
        memo: data.memo,
        category: { id: categoryId } as Category,
        user: { id: data.userId } as User,
      } as DeepPartial<Transaction>);
      return this.transactionRepository.save(saveData);
    }
  }
}
