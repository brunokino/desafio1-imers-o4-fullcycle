import { Transaction, TransactionType } from './entities/transaction.entity';
import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction) private transactionModel: typeof Transaction,
    private sequelize: Sequelize,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const atomic = await this.sequelize.transaction();
    try {
      const transaction = await this.transactionModel.create({
        ...createTransactionDto,
      });
      const amount =
        createTransactionDto.type === TransactionType.DEBIT
          ? -transaction.amount
          : transaction.amount;
      return transaction;
    } catch (e) {
      await atomic.rollback();
      throw e;
    }
  }

  findAll() {
    return this.transactionModel.findAll({
      
    });
  }

}