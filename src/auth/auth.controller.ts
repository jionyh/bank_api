import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/authRequest';
import { IsPublic } from '../decorators/is-public.decorator';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @IsPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  public async login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }
}
