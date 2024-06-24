import { AccountType } from '@prisma/client';
import { IsEnum, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  name: string;

  @IsEnum(AccountType)
  accountType: AccountType;

  @IsNumber()
  @IsPositive({ message: "Balance can't be negative" })
  balance: number;
}
