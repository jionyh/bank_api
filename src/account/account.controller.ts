import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dtos/createAccount.dto';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @UsePipes(ValidationPipe)
  @Post()
  public async create(@Body() createAccount: CreateAccountDto): Promise<any> {
    if (!createAccount.name || !createAccount.accountType)
      throw new BadRequestException(
        'Account name and account type is required',
      );
    if (createAccount.balance < 0)
      throw new BadRequestException('Balance cant be negative');

    //return await this.accountService.create(createAccount);
  }
}
