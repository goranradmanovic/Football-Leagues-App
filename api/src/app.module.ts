import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
//import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LeaguesModule } from './modules/leagues/leagues.module';
import { LeaguesTableModule } from './modules/leagues_table/leagues_table.module';
import { LeaguesTeamModule } from './modules/leagues_team/leagues_team.module';


@Module({
  imports: [
   // HttpModule,
    ConfigModule.forRoot(
      {
        isGlobal: true,
        envFilePath: '.env'
      }
    ),
    LeaguesModule,
    LeaguesTableModule,
    LeaguesTeamModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
