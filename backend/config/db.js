import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const DB_URI =
  process.env.NODE_ENV === "development"
    ? process.env.DB_CONNECT_LOCAL
    : process.env.DB_CONNECT_ATLAS;

const connectToDb = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`✅ Connected to MongoDB (${process.env.NODE_ENV})`);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

export default connectToDb;
