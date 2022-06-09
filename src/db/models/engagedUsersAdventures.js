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
      field: "id_adventure",
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
      field: "id_user",
      comment: "PK, composite unique identifier. FK to an engaged user with the adventure.",
    },
    isPublisher: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "is_publisher",
      comment: "Is true when the user is the owner/publisher of the adventure.",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      comment: "The creation datetime.",
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      comment: "The datetime of last modification.",
      field: "updated_at",
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      comment: "The datetime of deletion. Is null when is an active entry.",
      field: "deleted_at",
    },
  },
  {
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
