import { Controller, Get, Param } from "@nestjs/common";
import { LeaguesTableService } from "./leagues_table.service";

@Controller('leagues_table')
export class LeaguesTableController {
    constructor(private readonly leaguesTableService: LeaguesTableService) {}

    @Get(':id')
    async getLeaguesLookupTable(@Param('id') id: string) {
        return await this.leaguesTableService.fetchLeagueLookupTable(id);
    }
}