"use strict";
import { UserStates } from "./userStates";
import { sequelize } from "../connection";
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { Users } from "./users";

const ProfileInformation = sequelize.define(
  "ProfileInformation",
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
      unique: true,
      validate: {
        isUUID: 4,
      },
      field: "id_user",
      comment: "FK to owner user of profile information.",
    },
    idCurrentState: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1,
      field: "id_current_state",
      comment: "FK to current status.",
    },
    photoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
      field: "photo_url",
      comment: "The url to profile photo.",
    },
    biography: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
      comment: "User description or biography.",
    },
    numLater: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
      field: "num_later",
      comment: "Number of times the user has been engaged in an adventure and he arrived late.",
    },
    numMissing: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
      field: "num_missing",
      comment: "Number of times the user has been engaged in an adventure and he did not attend.",
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
    tableName: "profile_information",
    comment: "Information about interactions and status of each user.",
  }
);

ProfileInformation.belongsTo(Users, {
  foreignKey: "idUser",
});

Users.hasOne(ProfileInformation, {
  foreignKey: "idUser",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

ProfileInformation.belongsTo(UserStates, {
  foreignKey: "idCurrentState",
});

UserStates.hasMany(ProfileInformation, {
  foreignKey: "idCurrentState",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

export { ProfileInformation };
