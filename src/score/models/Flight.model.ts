import { Column, DataType, Table, Model, ForeignKey, HasOne, HasMany } from "sequelize-typescript";
import { Schedule } from "./Schedule.model";
import { eventType } from "../score.service";

interface CreationAttrs {
     type: eventType;
     date: string;
     airPortName: string;
}

@Table({ tableName: "flight", timestamps: true })
export class Flight extends Model<Flight, CreationAttrs> {
     @Column({
          type: DataType.INTEGER,
          unique: true,
          autoIncrement: true,
          primaryKey: true,
     })
     id: number;
     @Column({ type: DataType.STRING, allowNull: false })
     type: eventType;

     @Column({ type: DataType.STRING, allowNull: false })
     date: string;

     @Column({ type: DataType.STRING, allowNull: false })
     airPortName: string;

     @HasMany(() => Schedule, { onDelete: "CASCADE" })
     schedule: Schedule[];
}
