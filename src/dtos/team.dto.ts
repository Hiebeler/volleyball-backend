export class TeamDto {
  id: number;
  name: string;
  points?: number;

  constructor(team: any) {
    this.id = team.id;
    this.name = team.name;
    this.points = team.points;
  }
}
