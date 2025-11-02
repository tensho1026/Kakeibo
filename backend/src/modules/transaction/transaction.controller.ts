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
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}
  @Post()
  create(@Body() data: Type) {
    console.log('das');
    return this.transactionService.saveTransaction(data);
  }
}
