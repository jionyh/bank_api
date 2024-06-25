import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AccountService } from 'src/account/account.service';

@Module({
  imports: [],
  controllers: [PaymentController],
  providers: [PaymentService, PrismaService, AccountService],
  exports: [PaymentService],
})
export class PaymentModule {}
