import mongoose from "mongoose";
import dotenv from "dotenv"

import { app } from "./app";
import { PORT } from "./constants/env.constant";

dotenv.config()

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
