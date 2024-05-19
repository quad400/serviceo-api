import mongoose from "mongoose";
import dotenv from "dotenv"
import { v2 as cloudinary } from "cloudinary";
import { app } from "./app";
import { PORT } from "./constants/env.constant";

dotenv.config()


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_SECRETKEY,
});

function server() {
  async function connectDB() {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI!);
      console.log(`Database Connected: ${conn.connection.host}`);
    } catch (error: any) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  }

  app.listen(PORT, () => {
    connectDB();
    console.info(`Starting app on port ${PORT}`);
  });
}

server();
