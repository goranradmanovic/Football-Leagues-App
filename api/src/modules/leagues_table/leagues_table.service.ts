import { catchError, map } from "rxjs";
import { ConfigService } from "@nestjs/config";
import { Injectable, HttpException } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class LeaguesTableService {
    constructor(private readonly httpService: HttpService, private configService: ConfigService) {}

    async fetchLeagueLookupTable(leaguesId: string): Promise<any> {
        const baseUrl = this.configService.get<string>('API_URL');
        const key = this.configService.get<string>('API_KEY');
        const version = this.configService.get<string>('API_VERSION');
        const apiUrl = `${baseUrl}/${version}/${key}/lookuptable.php?l=${leaguesId}`; // lookuptable.php?l=4328

        return this.httpService.get(apiUrl).pipe(
            map(response => response.data.table),
            catchError(error => {
                throw new HttpException(error.response.data, error.response.status);
            })
        )
    }
}
