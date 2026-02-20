import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { LeaguesTeamController } from "./leagues_team.controller";
import { LeaguesTeamService } from "./leagues_team.service";

@Module({
    imports: [HttpModule],
    controllers: [LeaguesTeamController],
    providers: [LeaguesTeamService]
})

export class LeaguesTeamModule {} 