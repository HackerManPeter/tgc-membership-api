import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGaurd } from './gaurds/local-auth.gaurd';
import { Request } from 'express';
import { User } from 'src/user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGaurd)
  @Post('login')
  login(@Req() req: Request) {
    return this.authService.login(req.user as User);
  }
}
