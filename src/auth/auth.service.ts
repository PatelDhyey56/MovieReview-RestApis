import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import * as argon2 from 'argon2';
import { User } from 'src/database/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(loginDto: LoginDto): Promise<User> {
    try {
      const user = await this.userService.findEmail(loginDto.email);
      if (await argon2.verify(user?.password, loginDto.password)) {
        return user;
      } else {
        throw new UnauthorizedException('Unauthorized!!!...');
      }
    } catch (err) {
      throw new NotFoundException('user not Metched');
    }
  }

  async login(user: User): Promise<{ access_token: string }> {
    return {
      access_token: this.jwtService.sign({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        mobileNo: user.mobileNo,
        email: user.email,
      }),
    };
  }
}
