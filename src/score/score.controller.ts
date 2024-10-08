import { Body, Controller, Get, Param, Patch } from "@nestjs/common";
import { RemarkDto, ScoreService } from "./score.service";

@Controller("score")
export class ScoreController {
     constructor(private ScoreService: ScoreService) {}

     @Get()
     async getTodayScore() {
          const date = new Date();
          // const tmp = new Date("2024-10-03");

          return this.ScoreService.updateData(date);
     }

     @Patch("/:id")
     async remarkShcedule(@Param("id") id: number, @Body() dto: RemarkDto) {
          return this.ScoreService.toRemark(id, dto);
     }
}
