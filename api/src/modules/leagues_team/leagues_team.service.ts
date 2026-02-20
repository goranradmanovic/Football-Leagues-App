import { catchError, map } from "rxjs";
import { ConfigService } from "@nestjs/config";
import { Injectable, HttpException } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class LeaguesTeamService {
    constructor(private readonly httpService: HttpService, private configService: ConfigService) {}

    async fetchLeagueLookupTeam(teamId: string): Promise<any> {
        const baseUrl = this.configService.get<string>('API_URL');
        const key = this.configService.get<string>('API_KEY');
        const version = this.configService.get<string>('API_VERSION');
        const apiUrl = `${baseUrl}/${version}/${key}/lookupteam.php?id=${teamId}`; // lookupteam.php?id=133604

        // Object properties for removing
        const properties = [
            'strDescriptionDE', 
            'strDescriptionFR', 
            'strDescriptionCN', 
            'strDescriptionIT', 
            'strDescriptionJP', 
            'strDescriptionRU', 
            'strDescriptionES', 
            'strDescriptionPT',
            'strDescriptionSE',
            'strDescriptionNL',
            'strDescriptionHU',
            'strDescriptionNO',
            'strDescriptionIL',
            'strDescriptionPL'
        ];

        return this.httpService.get(apiUrl).pipe(
            map(response => {
                if (!response.data || !response.data.teams || response.data.teams.length === 0) {
                    throw new HttpException('Team not found', 404);
                }
                properties.forEach(key => delete response.data.teams[0][key]);
                return response.data.teams;
            }),
            catchError(error => {
                throw new HttpException(error.response.data, error.response.status);
            })
        )
    }
}
