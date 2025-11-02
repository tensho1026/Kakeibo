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

  @Post('transaction')
  createLegacy(@Body() data: Type) {
    console.log('できてるけ');
    return this.transactionService.saveTransaction(data);
  }

  @Post('transactions')
  create(@Body() data: Type) {
    return this.transactionService.saveTransaction(data);
  }
}
