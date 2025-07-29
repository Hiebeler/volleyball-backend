import type { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { resSend } from '../helper';
import { GameService } from '../services/game.service';

@injectable()
export class GameController {
  constructor(@inject(GameService) private readonly gameService: GameService) {}
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const games = await this.gameService.getAll();
      resSend(res, games);
    } catch (error) {
      next(error);
    }
  }
}
