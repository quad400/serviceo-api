import express from "express";
import cors from "cors"
import middlewareRouter from "./middlewares";
import { rootRouter } from "./routers";
import bodyParser from "body-parser";

export const app = express();




app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(middlewareRouter);
app.use("/api", rootRouter);
