import { Module } from "@nestjs/common";
import { ScoreController } from "./score.controller";
import { ScoreService } from "./score.service";
import { HttpModule } from "@nestjs/axios";

@Module({
     imports: [HttpModule],
     controllers: [ScoreController],
     providers: [ScoreService],
})
export class ScoreModule {}
