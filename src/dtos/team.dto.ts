export class TeamDto {
  id: number;
  name: string;
  points?: number;
  tableWins?: number;
  tableLosses?: number;
  tablePointsDiffrence?: number;

  constructor(team: any) {
    this.id = team.id;
    this.name = team.name;
    this.points = team.points;
  }
}
