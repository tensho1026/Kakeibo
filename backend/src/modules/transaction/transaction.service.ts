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
    private readonly transactionRepository: Repository<Transaction>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
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

    // カテゴリ名が渡されている場合、既存検索 or 新規作成
    if (!categoryId && data.category) {
      const foundCategory = await this.categoryRepository.findOne({
        where: { name: data.category },
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
        categoryId = newCategory.id;
      }
    }

    // categoryIdが最終的に確定していない場合はエラー
    if (!categoryId) {
      throw new Error('カテゴリが見つかりません');
    }

    // Transactionを作成して保存
    const saveData = this.transactionRepository.create({
      type:
        data.type === 'income'
          ? TransactionType.INCOME
          : TransactionType.EXPENSE,
      date: data.date,
      amount: data.amount,
      paymentMethod: data.paymentMethod,
      memo: data.memo,
      category: { id: categoryId } as Category,
      user: { id: data.userId } as User,
    } as DeepPartial<Transaction>);

    console.log('💾 Saving transaction:', saveData);

    return await this.transactionRepository.save(saveData);
  }
}
