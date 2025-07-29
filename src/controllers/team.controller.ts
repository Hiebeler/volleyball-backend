import type { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { TeamService } from '../services/team.service';
import { resSend } from '../helper';

@injectable()
export class TeamController {
  constructor(@inject(TeamService) private readonly teamService: TeamService) {}
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const teams = await this.teamService.getAll();
      resSend(res, teams);
    } catch (error) {
      next(error);
    }
  }
}
