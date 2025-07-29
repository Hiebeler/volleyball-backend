import { inject, injectable } from 'tsyringe';
import { PrismaService } from './prisma.service';
import { ApiError } from '../errors/apiError';
import { TableDto } from '../dtos/table.dto';

@injectable()
export class TableService {
  constructor(@inject(PrismaService) private prisma: PrismaService) {}

  async getAll(): Promise<TableDto[]> {
    const tables = await this.prisma.table.findMany({
      include: {
        teams: true,
        games: true,
      },
    });
    if (!tables) {
      throw new ApiError('no Tables found', 404);
    }
    const tablesDtos: TableDto[] = [];
    tables.forEach((table) => {
      let tableDto = new TableDto(table);
      tableDto = this.calculateTeamPoints(tableDto, table.games);
      tablesDtos.push(tableDto);
    });
    return tablesDtos;
  }

  calculateTeamPoints(tableDto: TableDto, games: any[]): TableDto {
    if (tableDto.teams) {
      tableDto.teams = tableDto.teams.map((team) => {
        let points = 0;
        const gamesOfTeam = games.filter(
          (game) =>
            (game.team1Id === team.id || game.team2Id === team.id) && game.status === 'FINISHED',
        );
        gamesOfTeam.map((game) => {
          const thisTeamScore = game.team1Id === team.id ? game.team1Score : game.team2Score;
          const otherTeamScore = game.team1Id === team.id ? game.team2Score : game.team1Score;

          if (thisTeamScore > otherTeamScore) points += 3;
          else if (thisTeamScore === otherTeamScore) points += 1;
        });
        team.points = points;
        return team;
      });
    }
    return tableDto;
  }
}
