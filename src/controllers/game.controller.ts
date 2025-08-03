import type { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { resSend } from '../helper';
import { GameService } from '../services/game.service';

@injectable()
export class GameController {
  constructor(@inject(GameService) private readonly gameService: GameService) {}
  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const games = await this.gameService.getAll();
      resSend(res, games);
    } catch (error) {
      next(error);
    }
  }

  async getUpcoming(_req: Request, res: Response, next: NextFunction) {
    try {
      const games = await this.gameService.getGames('PLANNED');
      resSend(res, games);
    } catch (error) {
      next(error);
    }
  }

  async getOngoing(_req: Request, res: Response, next: NextFunction) {
    try {
      const games = await this.gameService.getGames('ONGOING');
      resSend(res, games);
    } catch (error) {
      next(error);
    }
  }

  async getFinished(_req: Request, res: Response, next: NextFunction) {
    try {
      const games = await this.gameService.getGames('FINISHED');
      resSend(res, games);
    } catch (error) {
      next(error);
    }
  }

  async setStatus(req: Request, res: Response, next: NextFunction) {
    const status = req.body.status;
    const id = Number(req.params.gameId);
    try {
      const game = await this.gameService.setStatus(status, id);
      resSend(res, game);
    } catch (error) {
      next(error);
    }
  }
}
