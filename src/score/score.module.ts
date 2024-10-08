import { Module } from "@nestjs/common";
import { ScoreController } from "./score.controller";
import { ScoreService } from "./score.service";
import { HttpModule } from "@nestjs/axios";
import { SequelizeModule } from "@nestjs/sequelize";
import { Flight } from "./models/Flight.model";
import { Schedule } from "./models/Schedule.model";
import { SocketService } from "./socket/socket.service";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
     imports: [HttpModule, SequelizeModule.forFeature([Flight, Schedule]), ScheduleModule.forRoot()],
     controllers: [ScoreController],
     providers: [ScoreService, SocketService],
})
export class ScoreModule {}
