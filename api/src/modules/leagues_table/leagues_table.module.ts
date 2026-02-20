import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { LeaguesTableController } from "./leagues_table.controller";
import { LeaguesTableService } from "./leagues_table.service";

@Module({
    imports: [HttpModule],
    controllers: [LeaguesTableController],
    providers: [LeaguesTableService]
})

export class LeaguesTableModule {} 