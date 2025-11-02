import { DataSource } from 'typeorm';
import { Category } from '../entities/category.entity';
import { TransactionType } from '../entities/transaction.entity';

export async function seedCategories(dataSource: DataSource) {
  const categoryRepository = dataSource.getRepository(Category);

  const categories = [
    // 支出
    { name: '食費', type: TransactionType.EXPENSE },
    { name: '光熱費', type: TransactionType.EXPENSE },
    { name: '住居費', type: TransactionType.EXPENSE },
    { name: '交通費', type: TransactionType.EXPENSE },
    { name: '日用品', type: TransactionType.EXPENSE },
    { name: '娯楽', type: TransactionType.EXPENSE },
    { name: '教育', type: TransactionType.EXPENSE },
    { name: 'その他', type: TransactionType.EXPENSE },
    // 収入
    { name: '給与', type: TransactionType.INCOME },
    { name: '賞与', type: TransactionType.INCOME },
    { name: '副業', type: TransactionType.INCOME },
    { name: '投資', type: TransactionType.INCOME },
    { name: 'その他', type: TransactionType.INCOME },
  ];

  for (const c of categories) {
    const exists = await categoryRepository.findOne({
      where: { name: c.name },
    });
    if (!exists) {
      await categoryRepository.save(categoryRepository.create(c));
    }
  }

  console.log('✅ Categories seeded');
}
