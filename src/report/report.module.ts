import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaymentService } from 'src/payment/payment.service';

@Module({
  controllers: [ReportController],
  providers: [ReportService,PrismaService,PaymentService],
  exports:[ReportService]
})
export class ReportModule {}
