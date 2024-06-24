import { Injectable } from '@nestjs/common';
import { Account, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AccountService {
  constructor(private prismaService: PrismaService) {}

  public async create(data: Prisma.AccountCreateInput): Promise<Account> {
    return await this.prismaService.account.create({ data });
  }
}
