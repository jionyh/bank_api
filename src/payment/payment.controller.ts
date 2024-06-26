import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Payments } from '@prisma/client';
import { AccountService } from 'src/account/account.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaymentDto } from './dtos/payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(
    private paymentService: PaymentService,
    private accountService: AccountService,
  ) {}

  @Post('/create')
  @UseInterceptors(FileInterceptor('image'))
  public async create(
    @Body() createPayment: PaymentDto,
    @UploadedFile(new ParseFilePipe())
    file: Express.Multer.File,
  ): Promise<Payments> {
    console.log(createPayment);
    console.log('file', file);
    const account_id = +createPayment.account_id;
    const amount = parseFloat(createPayment.amount);

    const account = await this.accountService.findById(account_id);
    if (!account) throw new NotFoundException('Account not found');
    if (account && account.balance < amount)
      throw new BadRequestException('Insufficient balance');

    const upload = await this.paymentService.upload(
      file.originalname,
      file.buffer,
    );

    await this.accountService.update({
      id: account_id,
      data: {
        ...account,
        balance: account.balance - amount,
      },
    });
    const payment = await this.paymentService.create({
      account_id,
      amount,
      description: createPayment.description,
      imageUrl: upload,
    });
    return payment;
  }
}
