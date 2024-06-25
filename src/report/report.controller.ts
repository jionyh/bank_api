import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { Payments } from '@prisma/client';
import { PaymentService } from 'src/payment/payment.service';

@Controller('report')
export class ReportController {
  constructor(private paymentService:PaymentService){}

  @Get('/transactions')
  public async show(
    @Query('account_id') account_id:number,
    @Query('startDate') startDate:string,
    @Query('endDate') endDate:string
  ):Promise<{PaymentsAmount:number,Payments: Payments[]}>{  
    if(!account_id) throw new BadRequestException('Payments account id is missing')

    const paymentsList = await this.paymentService.find({account_id,
      startDate,
      endDate})

      const paymentsAmount = paymentsList.reduce((acc,payment)=>acc + payment.amount,0)
    return {
      PaymentsAmount: paymentsAmount,
      Payments: paymentsList
    }
  }
}
