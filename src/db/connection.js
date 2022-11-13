"use strict";
import { nodeEnvironment } from "../config/app.config";
import dbConfig from "../config/db.config";
import { Sequelize } from "sequelize";

const config = dbConfig[nodeEnvironment];
const sequelize = new Sequelize(config.database, config.username, config.password, config);

export { sequelize };
