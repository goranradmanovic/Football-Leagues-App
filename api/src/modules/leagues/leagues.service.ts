import { HttpService } from "@nestjs/axios";
import { Injectable, HttpException } from "@nestjs/common";
import { catchError, map } from "rxjs";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class LeaguesService {
    constructor(private readonly httpService: HttpService, private configService: ConfigService) {}

    async fetchAllLeagues(): Promise<any> {
        const baseUrl = this.configService.get<string>('API_URL');
        const key = this.configService.get<string>('API_KEY');
        const version = this.configService.get<string>('API_VERSION');
        const apiUrl = `${baseUrl}/${version}/${key}/all_leagues.php`;

        const countryCodes = [
            { id: 4328, code: 'GB-ENG' },
            { id: 4329, code: 'GB-ENG' }, 
            { id: 4330, code: 'GB-SCT' }, 
            { id: 4331, code: 'DE' }, 
            { id: 4332, code: 'IT' }, 
            { id: 4334, code: 'FR' }, 
            { id: 4335, code: 'ES' },
            { id: 4336, code: 'GR' }, 
            { id: 4337, code: 'NL' }, 
            { id: 4338, code: 'BE' }
        ];
        let allLeagues = undefined;

        return this.httpService.get(apiUrl).pipe(
            map((response) => {
                allLeagues = response.data.leagues.map((currentValue, index) => {
                    if (+currentValue.idLeague === countryCodes[index].id) {
                        currentValue.code = countryCodes[index].code
                    }
                    return currentValue;
                })
                return allLeagues
            }), // Extract the data from the Axios response
            catchError((error) => {
                throw new HttpException(error.response.data, error.response.status)
            }),
        );
    }
}