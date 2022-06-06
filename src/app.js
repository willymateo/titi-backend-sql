import usersRouter from "./routes/users.routes";
import authRouter from "./routes/auth.routes";
import cookieParser from "cookie-parser";
import pkg from "../package.json";
import express from "express";
import logger from "morgan";
import helmet from "helmet";
import cors from "cors";

const app = express();
app.set("pkg", pkg);

// Middlewares.
app.use(cors());
app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Routes.
app.get("/", (req, res) => {
  res.send({
    name: app.get("pkg").name,
    author: app.get("pkg").author,
    version: app.get("pkg").version,
    description: app.get("pkg").description,
  });
});
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

export { app };
