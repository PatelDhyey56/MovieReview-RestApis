import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from './user.service';

@Injectable()
export class emailMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const user = await this.userService.findEmail(req.body.email);
    if (user)
      throw new NotFoundException(
        'This Email is already exist, Plesae Enter Valid Email!!!...',
      );
    next();
  }
}
