import { Column, DataType, Table, Model, ForeignKey, HasOne, HasMany } from "sequelize-typescript";
import { Flight } from "./Flight.model";

interface CreationAttrs {
     carrier: string;
     time: string;
     flightName: string;
     flightNumber: string;
     flightId: number;
}

@Table({ tableName: "schedule", timestamps: true })
export class Schedule extends Model<Schedule, CreationAttrs> {
     @Column({
          type: DataType.INTEGER,
          unique: true,
          autoIncrement: true,
          primaryKey: true,
     })
     id: number;
     @Column({ type: DataType.STRING, allowNull: false })
     carrier: string;

     @Column({ type: DataType.STRING, allowNull: false })
     time: string;

     @Column({ type: DataType.STRING, allowNull: false })
     flightName: string;

     @Column({ type: DataType.STRING, allowNull: false })
     flightNumber: string;

     @Column({ type: DataType.STRING, allowNull: false, defaultValue: "-" })
     fact: string;

     @Column({ type: DataType.STRING, allowNull: false, defaultValue: "-" })
     reamark: string;

     @ForeignKey(() => Flight)
     @Column({ type: DataType.INTEGER })
     flightId: number;
}
