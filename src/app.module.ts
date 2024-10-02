import { Module } from "@nestjs/common";

import { ScoreModule } from "./score/score.module";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
     imports: [
          ConfigModule.forRoot({
               envFilePath: ".env",
          }),
          SequelizeModule.forRoot({
               dialect: "postgres",
               host: "localhost",
               port: 5432,
               username: "postgres",
               password: "TrWbZIRJZg2004.",
               database: "score",
               models: [],
               autoLoadModels: true,
          }),
          ScoreModule,
     ],
     controllers: [],
     providers: [],
})
export class AppModule {}
