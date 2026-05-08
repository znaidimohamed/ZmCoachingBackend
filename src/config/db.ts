import mongoose from "mongoose";
import { env } from "./env";

export const connectDB = async (): Promise<void> => {
  try {
    if (!env.mongoUri) {
      console.log("MONGO_URI not found. Server will start without database.");
      return;
    }

    await mongoose.connect(env.mongoUri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};