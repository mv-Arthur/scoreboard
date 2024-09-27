import { Controller, Get } from "@nestjs/common";
import { ScoreService } from "./score.service";

@Controller("score")
export class ScoreController {
     constructor(private ScoreService: ScoreService) {}

     @Get()
     async getTodayScore() {
          const date = new Date();
          return {
               depertue: await this.ScoreService.parseResponseData("departure", date),
               arrival: await this.ScoreService.parseResponseData("arrival", date),
          };
     }
}
