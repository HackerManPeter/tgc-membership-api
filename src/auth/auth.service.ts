import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDTO } from './dto/login-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginUser: LoginUserDTO) {
    try {
      const { email, password } = loginUser;
      const user = await this.userService.findOneByEmail(email);
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new Error('401');
      }

      return user;
    } catch (error) {
      if (error.message === '401') {
        throw new UnauthorizedException('Invalid email or password');
      }
    }
  }

  async login(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
    };

    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
