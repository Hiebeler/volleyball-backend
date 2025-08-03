import { inject, injectable } from 'tsyringe';
import { PrismaService } from './prisma.service';
import { ApiError } from '../errors/apiError';
import { GameDto } from '../dtos/game.dto';
import type { GameStatus } from '@prisma/client';

@injectable()
export class GameService {
  constructor(@inject(PrismaService) private prisma: PrismaService) {}

  async getAll(): Promise<GameDto[]> {
    const games = await this.prisma.game.findMany({
      include: {
        team1: true,
        team2: true,
        table: true,
      },
      orderBy: {
        position: 'asc',
      },
    });
    if (!games) {
      throw new ApiError('no games found', 404);
    }
    const gamesDto = games.map((game) => new GameDto(game));
    return gamesDto;
  }

  async getGames(status: GameStatus): Promise<GameDto[]> {
    const games = await this.prisma.game.findMany({
      where: {
        status: status,
      },
      include: {
        team1: true,
        team2: true,
        table: true,
      },
      orderBy: {
        position: 'asc',
      },
    });
    if (!games) {
      throw new ApiError('no games found', 404);
    }
    const gamesDto = games.map((game) => new GameDto(game));
    return gamesDto;
  }

  async setStatus(status: GameStatus, id: number): Promise<GameDto> {
    //Todo: checks, either return error when there is already a game running, or automatically set the running one to finsihed?
    const gameWithId = await this.prisma.game.findUnique({
      where: {
        id: id,
      },
    });
    if (!gameWithId) {
      throw new ApiError('game with id not found', 400);
    }
    if (status === 'ONGOING') {
      const ongoingGames = await this.getGames('ONGOING');
      if (ongoingGames.length > 0) {
        throw new ApiError('there is already a game ongoing', 400);
      }
    }
    console.log(`set game with id ${id}, to status: ${status}`);
    const game = await this.prisma.game.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });
    console.table(game);
    return game;
  }
}
