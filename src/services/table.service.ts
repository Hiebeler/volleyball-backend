import { inject, injectable } from 'tsyringe';
import { PrismaService } from './prisma.service';
import { ApiError } from '../errors/apiError';
import { TableDto } from '../dtos/table.dto';
import { Team } from '@prisma/client';
import { TeamDto } from '../dtos/team.dto';

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

      if (tableDto.teams) {
        tableDto.teams = tableDto.teams.sort((obj1: TeamDto, obj2: TeamDto) => {
          if (obj1.points! < obj2.points!) {
            return 1;
          } else if (obj1.points! > obj2.points!) {
            return -1;
          } else {
            if (obj1.tableWins! < obj2.tableWins!) {
              return 1;
            } else if (obj1.tableWins! > obj2.tableWins!) {
              return -1;
            } else {
              if (obj1.tablePointsDiffrence! < obj2.tablePointsDiffrence!) {
                return 1;
              } else {
                return -1;
              }
            }
          }
        });
      }
      tablesDtos.push(tableDto);
    });

    return tablesDtos;
  }

  calculateTeamPoints(tableDto: TableDto, games: any[]): TableDto {
    if (tableDto.teams) {
      tableDto.teams = tableDto.teams.map((team) => {
        let points = 0;
        let wins = 0;
        let losses = 0;
        let pointsDiffrence = 0;
        const gamesOfTeam = games.filter(
          (game) =>
            (game.team1Id === team.id || game.team2Id === team.id) && game.status === 'FINISHED',
        );
        gamesOfTeam.map((game) => {
          const thisTeamScore = game.team1Id === team.id ? game.team1Score : game.team2Score;
          const otherTeamScore = game.team1Id === team.id ? game.team2Score : game.team1Score;

          if (thisTeamScore > otherTeamScore) {
            points += 3;
            wins++;
          } else if (thisTeamScore === otherTeamScore) points += 1;
          else {
            losses++;
          }
          pointsDiffrence += thisTeamScore - otherTeamScore;
        });
        team.points = points;
        team.tableWins = wins;
        team.tableLosses = losses;
        team.tablePointsDiffrence = pointsDiffrence;
        return team;
      });
    }
    return tableDto;
  }
}
