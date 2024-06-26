import { IsNumber, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  account_id: number;

  @IsNumber()
  amount: number;

  @IsString()
  description: string;

  imageUrl?: string;
}
