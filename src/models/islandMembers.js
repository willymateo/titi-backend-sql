"use strict";
import { sequelize } from "../database";
import { DataTypes } from "sequelize";
import { Islands } from "./islands";
import { Users } from "./users";

const IslandMembers = sequelize.define(
  "IslandMembers",
  {
    idIsland: {
      primaryKey: true,
      type: DataTypes.UUID,
      allowNull: false,
      unique: "compositeIndex",
      validate: {
        isUUID: 4,
      },
      field: "id_island",
      comment: "PK, composite unique identifier. FK to an island.",
    },
    idUser: {
      primaryKey: true,
      type: DataTypes.UUID,
      allowNull: false,
      unique: "compositeIndex",
      validate: {
        isUUID: 4,
      },
      field: "id_user",
      comment: "PK, composite unique identifier. FK to an user member of the island.",
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "is_admin",
      comment: "Is true when the user is an island administrator.",
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
    tableName: "island_members",
    comment: "Users members of each island.",
  }
);

IslandMembers.belongsTo(Islands, {
  foreignKey: "idIsland",
});

Islands.hasMany(IslandMembers, {
  foreignKey: "idIsland",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

IslandMembers.belongsTo(Users, {
  foreignKey: "idUser",
});

Users.hasMany(IslandMembers, {
  foreignKey: "idUser",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export { IslandMembers };
