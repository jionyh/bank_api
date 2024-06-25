import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { PaymentModule } from './payment/payment.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ReportModule } from './report/report.module';

@Module({
  imports: [AccountModule, PaymentModule, UserModule, AuthModule, ReportModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
