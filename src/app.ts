import express from "express";
import cors from "cors"
import { v2 as cloudinary } from "cloudinary";
import middlewareRouter from "./middlewares";
import { rootRouter } from "./routers";
import bodyParser from "body-parser";

export const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_SECRETKEY,
});


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(middlewareRouter);
app.use("/api", rootRouter);
