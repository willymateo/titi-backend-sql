"use strict";
import { sequelize } from "../connection";
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { Users } from "./users";

const Phones = sequelize.define(
  "Phones",
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
      comment: "FK to owner user of the phone number.",
    },
    countryCode: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 593,
      validate: {
        notNull: true,
        min: 0,
      },
      comment: "Country code of the phone number.",
    },
    phoneNumber: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
      comment: "Phone number without the county code.",
    },
  },
  {
    paranoid: true,
    timestamps: true,
    underscored: true,
    tableName: "phones",
    comment: "Users phone numbers.",
  }
);

Phones.belongsTo(Users, {
  foreignKey: "idUser",
});

Users.hasMany(Phones, {
  foreignKey: "idUser",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export { Phones };
