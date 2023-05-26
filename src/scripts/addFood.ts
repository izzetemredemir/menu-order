import mongoose, { Document, Schema } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import CategorySchema from "../models/category";
import Food from "../models/food";

const { MongoClient } = require("mongodb");
mongoose.connect(process.env.MONGO_URI!);

async function addFood(
  name: string,
  description: string,
  price: number,
  categoryID: string,
  image: string
) {
  const newFood = new Food({
    name: name,
    description: description,
    price: price,
    category: categoryID,
    image: image,
  });

  try {
    await newFood.save();
    console.log("Yeni yemek başarıyla eklendi: ", newFood);
  } catch (error) {
    console.error("Yemek eklenirken bir hata oluştu: ", error);
  }
}

async function addFoodsToCategory(categoryName: string) {
  const category = await CategorySchema.findOne({ name: categoryName });

  if (!category) {
    console.error(`Kategori bulunamadı: ${categoryName}`);
    return;
  }

  const foods = [
    {
      name: "Mercimek Çorbası",
      description: "Türk mutfağının sevilen bir çorbasıdır",
      price: 15,
      image:
        "https://media.istockphoto.com/id/1070781890/tr/foto%C4%9Fraf/t%C3%BCrk-mutfa%C4%9F%C4%B1-bademli.jpg?s=612x612&w=0&k=20&c=af17uSHswCWAE73fXPDc0JYP3-f7KD0xn3ROgByPbpA=",
    },
    {
      name: "Domates Çorbası",
      description: "Türk mutfağının sevilen bir çorbasıdır",
      price: 12,
      image:
        "https://media.istockphoto.com/id/1070781890/tr/foto%C4%9Fraf/t%C3%BCrk-mutfa%C4%9F%C4%B1-bademli.jpg?s=612x612&w=0&k=20&c=af17uSHswCWAE73fXPDc0JYP3-f7KD0xn3ROgByPbpA=",
    },
    {
      name: "Mantı Çorbası",
      description: "Türk mutfağının sevilen bir çorbasıdır",
      price: 20,
      image:
        "https://media.istockphoto.com/id/1070781890/tr/foto%C4%9Fraf/t%C3%BCrk-mutfa%C4%9F%C4%B1-bademli.jpg?s=612x612&w=0&k=20&c=af17uSHswCWAE73fXPDc0JYP3-f7KD0xn3ROgByPbpA=",
    },
  ];

  for (const food of foods) {
    await addFood(
      food.name,
      food.description,
      food.price,
      category._id,
      food.image
    );
  }
}

addFoodsToCategory("Çorbalar");
