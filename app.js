const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const cors = require("cors");

const app = express();

//Middlewares.
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

module.exports = {
  app,
};
