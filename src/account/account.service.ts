import { Injectable } from '@nestjs/common';
import { Account, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAccountDto } from './dtos/createAccount.dto';

@Injectable()
export class AccountService {
  constructor(private prismaService: PrismaService) {}

  public async create(data: CreateAccountDto): Promise<Account> {
    return await this.prismaService.account.create({ data });
  }

  public async find(user_id: number): Promise<Account[]> {
    return await this.prismaService.account.findMany({
      where: { user_id },
      orderBy: { name: 'asc' },
    });
  }

  public async findById(id: number): Promise<Account | null> {
    return await this.prismaService.account.findFirst({ where: { id } });
  }

  public async update(param: {
    id: number;
    data: Prisma.AccountUpdateInput;
  }): Promise<Account> {
    const { id, data } = param;
    const updatedAccount = await this.prismaService.account.update({
      where: { id },
      data,
    });
    return updatedAccount;
  }
}
