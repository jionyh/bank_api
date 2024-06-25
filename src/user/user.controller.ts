import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { IsPublic } from 'src/decorators/is-public.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/me')
  public async show(@CurrentUser()user:User): Promise<User> {
    return user
  }

  @IsPublic()
  @Post('/signup')
  public async create(@Body() createUser: CreateUserDto): Promise<User> {
    if (!createUser?.email || !createUser?.password)
      throw new BadRequestException('Email and Password is required');

    const userByEmail = await this.userService.findByEmail(createUser.email);
    if (userByEmail) throw new BadRequestException('Email is already in use');

    const newUser = await this.userService.create(createUser);

    return newUser;
  }
}
