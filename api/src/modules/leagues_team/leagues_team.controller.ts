import { Controller, Get, Param } from "@nestjs/common";
import { LeaguesTeamService } from "./leagues_team.service";

@Controller('leagues_team')
export class LeaguesTeamController {
    constructor(private readonly leaguesTeamService: LeaguesTeamService) {}

    @Get(':id')
    async getLeaguesLookupTable(@Param('id') id: string) {
        return await this.leaguesTeamService.fetchLeagueLookupTeam(id);
    }
}