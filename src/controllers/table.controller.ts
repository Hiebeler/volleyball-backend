import type { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { TeamService } from '../services/team.service';
import { resSend } from '../helper';
import { TableService } from '../services/table.service';

@injectable()
export class TableController {
  constructor(@inject(TableService) private readonly tableService: TableService) {}
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const tables = await this.tableService.getAll();
      resSend(res, tables);
    } catch (error) {
      next(error);
    }
  }
}
