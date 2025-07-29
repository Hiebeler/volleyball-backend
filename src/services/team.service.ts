import { inject, injectable } from 'tsyringe';
import { PrismaService } from './prisma.service';
import { TeamDto } from '../dtos/team.dto';
import { ApiError } from '../errors/apiError';

@injectable()
export class TeamService {
  constructor(@inject(PrismaService) private prisma: PrismaService) {}

  async getAll(): Promise<TeamDto[]> {
    const teams = await this.prisma.team.findMany();
    if (!teams) {
      throw new ApiError('no Teams found', 404);
    }
    const teamsDtos = teams.map((team) => new TeamDto(team));
    return teamsDtos;
  }
}
