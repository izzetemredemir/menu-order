import mongoose, { Document, Schema } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import CategorySchema from "../models/category";

mongoose.connect(process.env.MONGO_URI!);

async function addCategory(name: string, description: string) {
  const newCategory = new CategorySchema({
    name: name,
    description: description,
  });

  try {
    await newCategory.save();
    console.log("Yeni kategori başarıyla eklendi: ", newCategory);
  } catch (error) {
    console.error("Kategori eklenirken bir hata oluştu: ", error);
  }
}

async function addCategories() {
  const categories = [
    { name: "Ana Yemekler", description: "Her türlü ana yemek tarifleri" },
    { name: "Tatlılar", description: "Çeşitli tatlı tarifleri" },
    { name: "Çorbalar", description: "Farklı çorba tarifleri" },
    { name: "Aperatifler", description: "Hafif ve lezzetli aperatifler" },
    { name: "Salatalar", description: "Sağlıklı ve lezzetli salata tarifleri" },
  ];

  for (const category of categories) {
    await addCategory(category.name, category.description);
  }
}

addCategories();
