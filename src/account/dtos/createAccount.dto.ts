import { AccountType } from '@prisma/client';
import { IsEnum, IsNumber, IsString, Min } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  name: string;
  user_id:number

  @IsEnum(AccountType)
  accountType: AccountType;

  @IsNumber()
  @Min(0,{ message: "Balance can't be negative" })
  balance: number;
}
