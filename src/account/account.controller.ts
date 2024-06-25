import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dtos/createAccount.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { Account, User } from '@prisma/client';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post()
  public async create(
    @Body() createAccount: CreateAccountDto,
    @CurrentUser() user: User,
  ): Promise<Account> {
    if (!createAccount.name || !createAccount.accountType)
      throw new BadRequestException(
        'Account name and account type is required',
      );
    if (createAccount.balance < 0)
      throw new BadRequestException('Balance cant be negative');

    const createAccountData: CreateAccountDto = {
      ...createAccount,
      user_id: user.id,
    };

    return await this.accountService.create(createAccountData);
  }

  @Get()
  public async show(@CurrentUser() user: User): Promise<Account[]> {
    return await this.accountService.find(user.id);
  }
}
