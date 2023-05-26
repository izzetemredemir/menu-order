import mongoose, { Document, Schema } from "mongoose";

export interface IReservation extends Document {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  note?: string;
  reservationTime?: number;
  persons?: number;
}

const ReservationSchema: Schema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  phoneNumber: { type: String },
  email: { type: String },
  note: { type: String },
  reservationTime: { type: Number },
  persons: { type: Number },
});

export default mongoose.model<IReservation>("Reservation", ReservationSchema);
