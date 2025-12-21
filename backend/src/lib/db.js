import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    const { MONGO_URL } = ENV;
    if (!MONGO_URL) throw new Error("MONGO_URL is not set");
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("error connection to mongoDb");
    process.exit(1);
  }
};
