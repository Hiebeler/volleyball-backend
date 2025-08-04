import { inject, injectable } from 'tsyringe';
import { PrismaService } from './prisma.service';
import { ApiError } from '../errors/apiError';
import { GameDto } from '../dtos/game.dto';
import { Game, GameStatus } from '@prisma/client';
import { broadcast } from './webSocket.service';

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
    const game = await this.prisma.game.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
      include: {
        team1: true,
        team2: true,
      },
    });
    const gameDto = new GameDto(game);
    if (gameDto.status === GameStatus.ONGOING) {
      broadcast(gameDto);
    }
    return gameDto;
  }

  async addScore(gameId: number, teamId: number): Promise<GameDto> {
    const game = await this.prisma.game.findUnique({
      where: {
        id: gameId,
      },
    });
    if (!game) {
      throw new ApiError('no game with this id found', 400);
    }
    if (game.status !== GameStatus.ONGOING) {
      throw new ApiError('game is not currently ongoing', 400);
    }
    let updatedGame: Game;
    if (game.team1Id === teamId) {
      updatedGame = await this.prisma.game.update({
        where: {
          id: gameId,
        },
        data: {
          team1Score: game.team1Score + 1,
        },
        include: {
          team1: true,
          team2: true,
        },
      });
    } else if (game.team2Id === teamId) {
      updatedGame = await this.prisma.game.update({
        where: {
          id: gameId,
        },
        data: {
          team2Score: game.team2Score + 1,
        },
        include: {
          team1: true,
          team2: true,
        },
      });
    } else {
      throw new ApiError('invalid team id', 400);
    }
    const gameDto = new GameDto(updatedGame);
    broadcast(gameDto);
    return gameDto;
  }
}
