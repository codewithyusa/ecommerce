import mongoose from "mongoose";

export const connectDB = async () => {
  const mongo = process.env.MONGO_URI;
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://user:<db_password>@cluster0.ooin5ux.mongodb.net/?appName=Cluster0/yusa"
    );

    console.log(`MongoDB connected Successfully`);
  } catch (error) {
    console.log("Error connecting to MONGODB", error.message);
  }
};
