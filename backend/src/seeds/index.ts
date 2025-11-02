import { AppDataSource } from '../data-source';
import { seedCategories } from './category.seed';

async function runSeed() {
  await AppDataSource.initialize();
  await seedCategories(AppDataSource);
  await AppDataSource.destroy();
  console.log('🌱 Seeding complete.');
}

runSeed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
