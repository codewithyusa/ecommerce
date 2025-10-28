import mongoose from "mongoose";

export const connectDB = async () => {
  const mongo = process.env.MONGO_URI;
  try {
    const conn = await mongoose.connect(mongo);

    console.log(`MongoDB connected Successfully`);
  } catch (error) {
    console.log("Error connecting to MONGODB", error.message);
  }
};
