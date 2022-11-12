import adventuresRouter from "./routes/adventures.routes";
import gendersRouter from "./routes/genders.routes";
import { morganFormat } from "./config/app.config";
import usersRouter from "./routes/users.routes";
import authRouter from "./routes/auth.routes";
import fileUpload from "express-fileupload";
import favicon from "serve-favicon";
import pkg from "../package.json";
import express from "express";
import logger from "morgan";
import helmet from "helmet";
import cors from "cors";
import path from "path";

const app = express();
app.use(favicon(path.join(__dirname, "../public", "favicon.ico")));
app.set("pkg", pkg);
app.set("case sensitive routing", true);

// Middlewares.
app.use(cors());
app.use(helmet());
app.use(fileUpload());
app.use(express.json());
app.use(logger(morganFormat));
app.use(express.urlencoded({ extended: false }));

// Routes.
app.get("/", (req, res) => {
  res.send({
    environment: process.env.NODE_ENV,
    name: app.get("pkg").name,
    author: app.get("pkg").author,
    version: app.get("pkg").version,
    description: app.get("pkg").description,
  });
});
app.use("/api/adventures", adventuresRouter);
app.use("/api/genders", gendersRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

export { app };
