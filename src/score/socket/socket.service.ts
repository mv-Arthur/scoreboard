import {
     ConnectedSocket,
     MessageBody,
     OnGatewayConnection,
     SubscribeMessage,
     WebSocketGateway,
     WebSocketServer,
} from "@nestjs/websockets";
import { RemarkDto } from "../score.service";
import { ScoreService } from "../score.service";
import { Server } from "socket.io";
import { Cron } from "@nestjs/schedule";

interface RemarkDtoWithId extends RemarkDto {
     id: number;
}

@WebSocketGateway({
     cors: {
          origin: "*",
     },
})
export class SocketService implements OnGatewayConnection {
     constructor(private ScoreService: ScoreService) {}

     @WebSocketServer()
     server: Server;

     @SubscribeMessage("remark-schedule")
     async remarkSchedule(@MessageBody() dto: RemarkDtoWithId, @ConnectedSocket() client: any) {
          const { id, ...fields } = dto;

          const schedule = await this.ScoreService.toRemark(id, fields);

          this.server.emit("remark-schedule", schedule);
     }

     @Cron("0 0 0 * * *")
     async updateOnMidnight() {
          const date = new Date();
          const data = await this.ScoreService.updateData(date);

          this.server.emit("update-data", data);
     }

     @Cron("* * * * * *")
     handleCron() {
          // console.log("раз в 45 секунд должно быть вызва");
          const date = new Date();
          const str = `${date.getHours()}:${date.getMinutes()}`;
     }

     handleConnection(client: any, ...args: any[]) {
          console.log("CONNECT");
     }
}
