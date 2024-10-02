import { Body, Controller, Get, Param, Patch } from "@nestjs/common";
import { RemarkDto, ScoreService } from "./score.service";

@Controller("score")
export class ScoreController {
     constructor(private ScoreService: ScoreService) {}

     @Get()
     async getTodayScore() {
          return this.ScoreService.updateData();
     }

     @Patch("/:id")
     async remarkShcedule(@Param("id") id: number, @Body() dto: RemarkDto) {
          return this.ScoreService.toRemark(id, dto);
     }
}
