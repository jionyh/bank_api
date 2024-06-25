import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePaymentDto } from './dtos/createPayment.dto';
import { Payments } from '@prisma/client';

@Injectable()
export class PaymentService {
  constructor(private prismaService: PrismaService) {}

  public async create(data: CreatePaymentDto): Promise<Payments> {
    return await this.prismaService.payments.create({ data });
  }

  public async find(params: {
    account_id: number;
    startDate?: string;
    endDate?: string;
  }): Promise<Payments[]> {
    const filterOptions = {
      //Adicionar lib date-fns depois
      lte: params.endDate ? new Date(`${params.endDate}`) : undefined,
      gte: params.startDate ? new Date(`${params.startDate}`) : undefined,
    };
    return await this.prismaService.payments.findMany({
      where: {
        account_id: params.account_id,
        date: filterOptions,
      },
      orderBy: {
        date: 'asc',
      },
    });
  }
}
