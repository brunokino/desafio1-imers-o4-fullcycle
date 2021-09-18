import {
    TransactionType,
    TransactionTypeList,
  } from './../entities/transaction.entity';
  import {
    IsIn,
    IsISO8601,
    IsNotEmpty,
    IsString,
    MaxLength,
  } from 'class-validator';
  
  export class CreateTransactionDto {
    @IsNotEmpty()
    amount: number;
  
    @IsIn(TransactionTypeList)
    @IsNotEmpty()
    type: TransactionType;
  }