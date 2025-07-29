import { TeamDto } from './team.dto';

export class TableDto {
  id: number;
  name: string;
  teams?: TeamDto[];
  //games: GameDto[];

  constructor(table: any) {
    this.id = table.id;
    this.name = table.name;
    if (table.teams) {
      this.teams = table.teams.map((team: any) => new TeamDto(team));
    }
  }
}
