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
      },
    });
    if (!tables) {
      throw new ApiError('no Tables found', 404);
    }
    const tablesDto = tables.map((table) => new TableDto(table));
    return tablesDto;
  }
}
