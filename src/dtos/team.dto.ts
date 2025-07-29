export class TeamDto {
  id: number;
  name: string;

  constructor(team: any) {
    this.id = team.id;
    this.name = team.name;
  }
}
