import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LocalAuthGuard } from './local.strategy';
import { Public } from '../helpers/publicRoute';
import { Request } from 'express';
import { User } from 'src/database/entity/user.entity';

@ApiTags('Login')
@ApiNotFoundResponse({
  description: 'Not Found',
})
@ApiBadRequestResponse({ description: 'Bad Request' })
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({ type: LoginDto })
  @ApiCreatedResponse({
    description: 'Login Succesfully',
    type: String,
  })
  async login(@Req() req: Request): Promise<{ access_token: string }> {
    return this.authService.login(req.user as User);
  }
}
