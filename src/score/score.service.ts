import { HttpService } from "@nestjs/axios";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import axios from "axios";
import { FlightsType, SceduleType } from "./sandbox";
import * as moment from "moment";
import { InjectModel } from "@nestjs/sequelize";
import { Flight } from "./models/Flight.model";
import { Schedule } from "./models/Schedule.model";

export type eventType = "departure" | "arrival";

class FlightsDto {
     carrier: string;
     time: string;
     flightName: string;
     flightNumber: string;
     constructor(schedule: SceduleType, event: eventType) {
          this.carrier = schedule.thread.carrier.title;
          this.time = event === "arrival" ? schedule.arrival : schedule.departure;
          this.flightName = schedule.thread.title;
          this.flightNumber = schedule.thread.number;
     }
}

export class RemarkDto {
     readonly fact: string;
     readonly remark: string;
}

@Injectable()
export class ScoreService {
     constructor(
          @InjectModel(Flight) private flightRepository: typeof Flight,
          @InjectModel(Schedule) private scheduleRepository: typeof Schedule,
     ) {}

     async fetchFlightsToday(event: eventType, date: Date): Promise<FlightsType> {
          // console.log();
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
               type: data.event,
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

     async join(date: Date) {
          const departure = await this.parseResponseData("departure", date);
          const arrival = await this.parseResponseData("arrival", date);

          return [departure, arrival];
     }

     async updateData(date: Date) {
          const data = await this.join(date);

          const fromDB = await this.flightRepository.findAll({ include: [Schedule] });

          if (fromDB[0].date === data[0].date) return fromDB;

          await this.flightRepository.destroy({
               where: {},
               force: true,
          });

          await Promise.all(
               data.map(async (el) => {
                    const flight = await this.flightRepository.create(el);
                    const schedule = await Promise.all(
                         el.schedule.map(async (el) => {
                              const schedule = await this.scheduleRepository.create({ ...el, flightId: flight.id });
                              return schedule;
                         }),
                    );

                    return { ...flight, schedule };
               }),
          );

          try {
               return await this.flightRepository.findAll({ include: [Schedule] });
          } catch (err) {
               console.log(err);
          }
     }

     async toRemark(scheduleId: number, dto: RemarkDto) {
          const schedule = await this.scheduleRepository.findOne({ where: { id: scheduleId } });
          if (!schedule) throw new HttpException("запись не найдена", HttpStatus.BAD_REQUEST);

          const { fact, remark } = dto;

          schedule.fact = fact;
          schedule.reamark = remark;

          await schedule.save();

          return schedule;
     }
}
