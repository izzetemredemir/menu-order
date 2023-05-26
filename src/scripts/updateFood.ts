import mongoose, { Document, Schema } from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();
import CategorySchema from "../models/category";
import Food from "../models/food";

const { MongoClient } = require("mongodb");
mongoose.connect(process.env.MONGO_URI!);

async function updateFoodImagesInCategory(
  categoryID: string,
  newImage: string
) {
  try {
    // Find all foods in the given category and update their image field
    const result = await Food.updateMany(
      { category: categoryID },
      { $set: { image: newImage } }
    );

    console.log(
      `${result["nModified"]} food image(s) updated successfully in category ${categoryID}`
    );
  } catch (error) {
    console.error("Food images update error: ", error);
  }
}

// usage
const newImage =
  "https://www.nizampide.com/wp-content/uploads/2018/07/nizam-special-kar%C4%B1%C5%9F%C4%B1k-kebap-%C4%B1zgara-porsiyon-nizam-pide-s%C3%BCtla%C3%A7-istanbul-beyo%C4%9Flu-istiklal-caddesi-600x600.jpg";
updateFoodImagesInCategory("646e70db7e5b447705fd6622", newImage);
