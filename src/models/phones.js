"use strict";
import { sequelize } from "../database";
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
      field: "id_user",
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
      field: "country_code",
      comment: "Country code of the phone number.",
    },
    phoneNumber: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
      field: "phone_number",
      comment: "Phone number without the county code.",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      comment: "The creation datetime.",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      comment: "The datetime of last modification.",
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      comment: "The datetime of deletion. Is null when is an active entry.",
    },
  },
  {
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
