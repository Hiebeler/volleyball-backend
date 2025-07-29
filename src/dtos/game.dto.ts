import { TableDto } from './table.dto';
import { TeamDto } from './team.dto';

export class GameDto {
  id: number;
  team1?: TeamDto;
  team2?: TeamDto;
  table?: TableDto;
  position: number;

  constructor(team: any) {
    this.id = team.id;
    if (team.team1 && team.team2) {
      this.team1 = new TeamDto(team.team1);
      this.team2 = new TeamDto(team.team2);
    }
    if (team.table) {
      this.table = new TableDto(team.table);
    }
    this.position = team.position;
  }
}
