import mongoose, { ConnectOptions } from "mongoose";
// tes
const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error(
    "Please define the MONGO_URI environment variable inside .env",
  );
}

export async function connectToDatabase() {
  try {
    const options: ConnectOptions = {};

    const client = await mongoose.connect(MONGO_URI, options);
    console.log("Connected to MongoDB");

    return client.startSession();
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
}
