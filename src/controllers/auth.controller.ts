import type { NextFunction, Request, Response } from 'express';
import { resSend, ResStatus } from '../helper';
import { AuthService } from '../services/auth.service';
import { inject, injectable } from 'tsyringe';

@injectable()
export class AuthController {
  constructor(@inject(AuthService) private readonly authService: AuthService) {}
  login = async (req: Request, res: Response, next: NextFunction) => {
    const password = req.body.password;
    if (!password) {
      resSend(res, null, ResStatus.ERROR, 'no password passed', 400);
    }

    try {
      const jwt = await this.authService.login(password);
      resSend(res, jwt);
    } catch (error) {
      next(error);
    }
  };
}
