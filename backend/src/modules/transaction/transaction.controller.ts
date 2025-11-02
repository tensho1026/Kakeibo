import { Body, Controller, Post } from '@nestjs/common';

import { TransactionService } from './transaction.service';
import { PaymentType, TransactionType } from 'src/entities/transaction.entity';

type Type = {
  type: TransactionType;
  date: Date;
  amount: number;
  categoryId: number;
  paymentMethod?: PaymentType;
  memo?: string;
  userId: number;
};
@Controller()
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  private persistTransaction(data: Type) {
    console.log('das');
    return this.transactionService.saveTransaction(data);
  }

  @Post('transaction')
  createLegacy(@Body() data: Type) {
    return this.persistTransaction(data);
  }

  @Post('transactions')
  create(@Body() data: Type) {
    return this.persistTransaction(data);
  }
}
