import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePaymentDto } from './dtos/createPayment.dto';
import { Payments } from '@prisma/client';
import { AccountService } from 'src/account/account.service';

@Injectable()
export class PaymentService {
  constructor(private prismaService:PrismaService){}

  public async create(data:CreatePaymentDto):Promise<Payments>{
    return await this.prismaService.payments.create({data})
  }

  public async find(params:{
    id:number,
    startDate:Date,
    endDate:Date,
  }):Promise<Payments[]>{
    return await this.prismaService.payments.findMany({
      where:{
        id:params.id,
        date:{
          gte: params.endDate,
          lte: params.startDate,
        }
      },
    })
  }
}
