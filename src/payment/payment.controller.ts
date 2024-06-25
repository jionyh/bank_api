import { BadRequestException, Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dtos/createPayment.dto';
import { Payments } from '@prisma/client';
import { AccountService } from 'src/account/account.service';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService:PaymentService, private accountService:AccountService){}

  @Post('/create')
  public async create(
    @Body() createPayment:CreatePaymentDto
  ):Promise<Payments>{
    console.log(createPayment)
    const account = await this.accountService.findById(createPayment.account_id)
    if(!account)throw new NotFoundException('Account not found')
    if(account && account.balance < createPayment.amount) throw new BadRequestException('Insufficient balance')

    await this.accountService.update({
      id: createPayment.account_id,
      data:{
        ...account,
        balance: account.balance - createPayment.amount
      }
    })
    const payment = await this.paymentService.create(createPayment)
    return payment
}
}
