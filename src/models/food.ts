import mongoose, { Document, Schema } from "mongoose";
import { ICategory } from "./category";

interface IFood extends Document {
  name: string;
  description: string;
  price: number;
  category: ICategory["_id"];
}

const FoodSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  image: { type: String, required: false },
});

export default mongoose.model<IFood>("Food", FoodSchema);
