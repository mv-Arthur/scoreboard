import { eventType } from "./score.service";

type APIResponseType = {
     depertue: FlightsType;
     arrival: FlightsType;
};

export type FlightsType = {
     date: string;
     station: {
          type: string;
          title: string;
          short_title: string;
          popular_title: string;
          code: string;
          station_type: StationType;
          station_type_name: string;
          transport_type: TransportType;
     };
     event: eventType;
     pagination: {
          total: number;
          limit: number;
          offset: number;
     };
     schedule: SceduleType[];
     interval_schedule: any[];
};

export type SceduleType = {
     thread: {
          number: string;
          title: string;
          short_title: string;
          carrier: {
               code: number;
               title: string;
               codes: {
                    sirena: string;
                    iata: string;
                    icao: string;
               };
          };
          vehicle: string;
          transport_type: TransportType;
          express_type: null | string;
          transport_subtype: {
               title: null | string;
               code: null | string;
               color: null | string;
          };
          uid: string;
     };
     terminal: null | string;
     is_fuzzy: boolean;
     stops: string;
     platform: string;
     except_days: null | string;
     arrival: string;
     departure: string;
     days: string;
};

type TransportType = "plane" | "train" | "suburban" | "bus" | "water" | "helicopter";

type StationType =
     | "station"
     | "platform"
     | "stop"
     | "checkpoint"
     | "post"
     | "crossing"
     | "overtaking_point"
     | "train_station"
     | "airport"
     | "bus_station"
     | "bus_stop"
     | "unknown"
     | "port"
     | "port_point"
     | "wharf"
     | "river_port"
     | "marine_station";

const data: APIResponseType = {
     depertue: {
          date: "2024-09-27",
          station: {
               type: "station",
               title: "Бугульма",
               short_title: "",
               popular_title: "",
               code: "s9623538",
               station_type: "airport",
               station_type_name: "аэропорт",
               transport_type: "plane",
          },
          event: "departure",
          pagination: {
               total: 3,
               limit: 100,
               offset: 0,
          },

          schedule: [
               {
                    thread: {
                         number: "RT 337",
                         title: "Бугульма — Ноябрьск",
                         short_title: "Бугульма — Ноябрьск",
                         carrier: {
                              code: 56935,
                              title: "ЮВТ Аэро",
                              codes: {
                                   sirena: "ЮВ",
                                   iata: "RT",
                                   icao: null,
                              },
                         },
                         vehicle: "Bombardier CRJ200",
                         transport_type: "plane",
                         express_type: null,
                         transport_subtype: {
                              title: null,
                              code: null,
                              color: null,
                         },
                         uid: "RT-337_240927_c56935_12",
                    },
                    terminal: null,
                    is_fuzzy: false,
                    stops: "",
                    platform: "",
                    except_days: null,
                    departure: "2024-09-27T03:40:00+03:00",
                    arrival: null,
                    days: "пт по 27.12",
               },
               {
                    thread: {
                         number: "RT 339",
                         title: "Бугульма — Усинск",
                         short_title: "Бугульма — Усинск",
                         carrier: {
                              code: 56935,
                              title: "ЮВТ Аэро",
                              codes: {
                                   sirena: "ЮВ",
                                   iata: "RT",
                                   icao: null,
                              },
                         },
                         vehicle: "Bombardier CRJ200",
                         transport_type: "plane",
                         express_type: null,
                         transport_subtype: {
                              title: null,
                              code: null,
                              color: null,
                         },
                         uid: "RT-339_240927_c56935_12",
                    },
                    terminal: null,
                    is_fuzzy: false,
                    stops: "",
                    platform: "",
                    except_days: null,
                    departure: "2024-09-27T10:20:00+03:00",
                    arrival: null,
                    days: "вт, пт по 31.12",
               },
               {
                    thread: {
                         number: "RT 331",
                         title: "Бугульма — Нижневартовск",
                         short_title: "Бугульма — Нижневартовск",
                         carrier: {
                              code: 56935,
                              title: "ЮВТ Аэро",
                              codes: {
                                   sirena: "ЮВ",
                                   iata: "RT",
                                   icao: null,
                              },
                         },
                         vehicle: "Bombardier CRJ200",
                         transport_type: "plane",
                         express_type: null,
                         transport_subtype: {
                              title: null,
                              code: null,
                              color: null,
                         },
                         uid: "RT-331_240927_c56935_12",
                    },
                    terminal: null,
                    is_fuzzy: false,
                    stops: "",
                    platform: "",
                    except_days: null,
                    departure: "2024-09-27T21:30:00+03:00",
                    arrival: null,
                    days: "27 сентября, 4, 11, 18, 25 октября",
               },
          ],
          interval_schedule: [],
     },
     arrival: {
          date: "2024-09-27",
          station: {
               type: "station",
               title: "Бугульма",
               short_title: "",
               popular_title: "",
               code: "s9623538",
               station_type: "airport",
               station_type_name: "аэропорт",
               transport_type: "plane",
          },
          event: "arrival",
          pagination: {
               total: 2,
               limit: 100,
               offset: 0,
          },
          schedule: [
               {
                    thread: {
                         number: "RT 338",
                         title: "Ноябрьск — Бугульма",
                         short_title: "Ноябрьск — Бугульма",
                         carrier: {
                              code: 56935,
                              title: "ЮВТ Аэро",
                              codes: {
                                   sirena: "ЮВ",
                                   iata: "RT",
                                   icao: null,
                              },
                         },
                         vehicle: "Bombardier CRJ200",
                         transport_type: "plane",
                         express_type: null,
                         transport_subtype: {
                              title: null,
                              code: null,
                              color: null,
                         },
                         uid: "RT-338_240927_c56935_12",
                    },
                    terminal: null,
                    is_fuzzy: false,
                    stops: "",
                    platform: "",
                    except_days: null,
                    arrival: "2024-09-27T09:40:00+03:00",
                    departure: null,
                    days: "пт по 27.12",
               },
               {
                    thread: {
                         number: "RT 340",
                         title: "Усинск — Бугульма",
                         short_title: "Усинск — Бугульма",
                         carrier: {
                              code: 56935,
                              title: "ЮВТ Аэро",
                              codes: {
                                   sirena: "ЮВ",
                                   iata: "RT",
                                   icao: null,
                              },
                         },
                         vehicle: "Bombardier CRJ200",
                         transport_type: "plane",
                         express_type: null,
                         transport_subtype: {
                              title: null,
                              code: null,
                              color: null,
                         },
                         uid: "RT-340_240927_c56935_12",
                    },
                    terminal: null,
                    is_fuzzy: false,
                    stops: "",
                    platform: "",
                    except_days: null,
                    arrival: "2024-09-27T20:40:00+03:00",
                    departure: null,
                    days: "вт, пт по 31.12",
               },
          ],
          interval_schedule: [],
     },
};
