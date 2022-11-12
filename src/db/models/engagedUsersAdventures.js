"use strict";
import { Adventures } from "./adventures";
import { sequelize } from "../connection";
import { DataTypes } from "sequelize";
import { Users } from "./users";

const EngagedUsersAdventures = sequelize.define(
  "EngagedUsersAdventures",
  {
    idAdventure: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      unique: "compositeIndex",
      validate: {
        isUUID: 4,
      },
      comment: "PK, composite unique identifier. FK to an adventure.",
    },
    idUser: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      unique: "compositeIndex",
      validate: {
        isUUID: 4,
      },
      comment: "PK, composite unique identifier. FK to an engaged user with the adventure.",
    },
  },
  {
    paranoid: true,
    timestamps: true,
    underscored: true,
    tableName: "engaged_users_adventures",
    comment: "Engaged users with adventures.",
  }
);

EngagedUsersAdventures.belongsTo(Adventures, {
  foreignKey: "idAdventure",
});

Adventures.hasMany(EngagedUsersAdventures, {
  foreignKey: "idAdventure",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

EngagedUsersAdventures.belongsTo(Users, {
  foreignKey: "idUser",
});

Users.hasMany(EngagedUsersAdventures, {
  foreignKey: "idUser",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export { EngagedUsersAdventures };
