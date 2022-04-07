const cookieParser = require("cookie-parser");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const authenticationRouter = require("./routes/authentication-router");
const usersRouter = require("./routes/users-router");

const app = express();

//Middlewares.
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authenticationRouter);
app.use("/api/users", usersRouter);

module.exports = {
  app,
};
