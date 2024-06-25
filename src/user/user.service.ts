import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { Prisma, User } from '@prisma/client';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  public async create(data: CreateUserDto): Promise<User> {
    const salts = 10;
    const passwordHashed = await hash(data?.password, salts);
    const userData: Prisma.UserCreateInput = {
      ...data,
      password: passwordHashed,
    };
    const createUser = await this.prismaService.user.create({ data: userData });
    return createUser;
  }

  public async show(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }

  public async findByEmail(email: string): Promise<User | null> {
    const findUserByEmail = await this.prismaService.user.findFirst({
      where: { email },
    });
    return findUserByEmail;
  }
}
