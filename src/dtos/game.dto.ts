import { TableDto } from './table.dto';
import { TeamDto } from './team.dto';

export class GameDto {
  id: number;
  team1?: TeamDto;
  team2?: TeamDto;
  team1Score: number;
  team2Score: number;
  table?: TableDto;
  position: number;
  status: string;

  constructor(team: any) {
    this.id = team.id;
    if (team.team1 && team.team2) {
      this.team1 = new TeamDto(team.team1);
      this.team2 = new TeamDto(team.team2);
    }
    if (team.table) {
      this.table = new TableDto(team.table);
    }
    this.team1Score = team.team1Score ?? 0;
    this.team2Score = team.team2Score ?? 0;
    this.position = team.position;
    this.status = team.status;
  }
}
