"use strict";
import { AdventureStates } from "./adventureStates";
import { sequelize } from "../connection";
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";

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
      defaultValue: 1,
      field: "id_status",
      comment: "FK to current status.",
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
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "start_datetime",
      comment: "The datetime when the adventure was published.",
    },
    endDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "end_datetime",
      comment: "The datetime when the adventure will expire. Up to 24h since the start_datetime.",
    },
    numInvitations: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1,
      },
      field: "num_invitations",
      comment:
        "Number of allow users that can engaged with the adventure. This number not include the publisher user.",
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

export { Adventures };
