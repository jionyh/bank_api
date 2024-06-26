import { IsString } from 'class-validator';

export class PaymentDto {
  @IsString()
  account_id: string;

  @IsString()
  amount: string;

  @IsString()
  description: string;

  image?: File;
  imageUrl?: string;
}
