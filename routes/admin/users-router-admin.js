const express = require("express");
const { Users } = require("../../db/models");
const { Phones } = require("../../db/models");
const { Locations } = require("../../db/models");
const { User_roles } = require("../../db/models");
const { verifyTokenAdmin } = require("../middlewares/token-authorization");

const router = express.Router();

module.exports = router;
