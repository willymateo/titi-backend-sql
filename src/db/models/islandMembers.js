"use strict";
import { sequelize } from "../connection";
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
      comment: "PK, composite unique identifier. FK to an user member of the island.",
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: "Is true when the user is an island administrator.",
    },
  },
  {
    paranoid: true,
    timestamps: true,
    underscored: true,
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
