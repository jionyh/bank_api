import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { UserPayload } from './models/userPayload';
import { UserToken } from './models/userToken';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async validateUser(email: string, password: string) {
    const userByEmail = await this.userService.findByEmail(email);
    if (userByEmail) {
      const isMatch = await compare(password, userByEmail?.password || '');
      if (isMatch) {
        return {
          ...userByEmail,
          password: undefined,
        };
      }
    }

    throw new NotFoundException('Email or Password invalid');
  }

  login(user: { id: number; email: string; password: string }): UserToken {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
    };
    const jwtToken = this.jwtService.sign(payload);
    return {
      accessToken: jwtToken,
    };
  }
}
