import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import axios, { AxiosResponse } from "axios";
import { lastValueFrom, Observable } from "rxjs";
import { FlightsType, SceduleType } from "./sandbox";
import * as moment from "moment";

export type eventType = "departure" | "arrival";

class FlightsDto {
     carrier: string;
     time: string;
     airportName: string;
     flight: string;
     constructor(schedule: SceduleType, event: eventType) {
          this.carrier = schedule.thread.carrier.title;
          this.time = event === "arrival" ? schedule.arrival : schedule.departure;
          this.airportName = schedule.thread.title;
          this.flight = schedule.thread.number;
     }
}

@Injectable()
export class ScoreService {
     constructor(private readonly httpService: HttpService) {}

     async fetchFlightsToday(event: eventType, date: Date): Promise<FlightsType> {
          const isoDate = date.toISOString();
          try {
               const response = await axios.get(
                    `https://api.rasp.yandex.net/v3.0/schedule/?apikey=11277159-ec8e-4e91-b735-ebc275681a99&station=UUA&transport_types=plane&system=iata&date=${isoDate}&event=${event}`,
               );

               return response.data;
          } catch (err) {
               console.log(err);
          }
     }

     parseDataToTime(isoDate: string) {
          const formattedTime = moment(isoDate).format("HH:mm");
          return formattedTime;
     }

     async parseResponseData(event: eventType, date: Date) {
          const data = await this.fetchFlightsToday(event, date);

          const updated = {
               date: data.date,
               airPortName: data.station.title,
               schedule: data.schedule.map((el) => {
                    const row = new FlightsDto(el, data.event);
                    return { ...row, time: this.parseDataToTime(row.time) };
                    // return row;
               }),
          };

          return updated;
     }
}
