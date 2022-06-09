"use strict";
import { sequelize } from "../connection";
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { Users } from "./users";

const Locations = sequelize.define(
  "Locations",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      allowNull: false,
      defaultValue: () => uuidv4(),
      validate: {
        isUUID: 4,
      },
      comment: "PK, unique identifier.",
    },
    idUser: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        isUUID: 4,
      },
      comment: "FK to user that is in the location.",
    },
    latitude: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    longitude: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    isCurrent: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "Is true when it is the current user location to play.",
    },
  },
  {
    paranoid: true,
    timestamps: true,
    underscored: true,
    tableName: "locations",
    comment: "Locations of each users.",
  }
);

Locations.belongsTo(Users, {
  foreignKey: "idUser",
});

Users.hasMany(Locations, {
  foreignKey: "idUser",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export { Locations };
