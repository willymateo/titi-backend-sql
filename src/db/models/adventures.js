"use strict";
import { AdventureStates } from "./adventureStates";
import { sequelize } from "../connection";
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { Users } from "./users";

const Adventures = sequelize.define(
  "Adventures",
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
    idStatus: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "FK to current status.",
    },
    idPublisher: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: "FK to publisher user.",
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    startDateTime: {
      field: "start_datetime",
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      comment: "The datetime when the adventure was published.",
    },
    endDateTime: {
      field: "end_datetime",
      type: DataTypes.DATE,
      allowNull: false,
      comment: "The datetime when the adventure will expire. Up to 24h since the start_datetime.",
    },
    numInvitations: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1,
      },
      comment:
        "Number of allow users that can engaged with the adventure. This number not include the publisher user.",
    },
  },
  {
    paranoid: true,
    timestamps: true,
    underscored: true,
    tableName: "adventures",
    comment: "Adventures published by users.",
  }
);

Adventures.belongsTo(AdventureStates, {
  foreignKey: "idStatus",
});

AdventureStates.hasMany(Adventures, {
  foreignKey: "idStatus",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

Adventures.belongsTo(Users, {
  foreignKey: "idPublisher",
});

Users.hasMany(Adventures, {
  foreignKey: "idPublisher",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

// Hooks
Adventures.beforeValidate(async (adventure, options) => {
  if (!adventure.idStatus) {
    const openState = await AdventureStates.findOne({
      where: { state: "open" },
    });
    adventure.idStatus = openState.id;
  }
});

Adventures.beforeCreate(async (adventure, options) => {
  if (!adventure.idStatus) {
    const openState = await AdventureStates.findOne({
      where: { state: "open" },
    });
    adventure.idStatus = openState.id;
  }
});

export { Adventures };
