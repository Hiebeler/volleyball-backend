import { inject, injectable } from 'tsyringe';
import { PrismaService } from './prisma.service';
import { ApiError } from '../errors/apiError';
import { GameDto } from '../dtos/game.dto';

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
}
