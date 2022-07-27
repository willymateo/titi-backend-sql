"use strict";
import { UserStates } from "./userStates";
import { sequelize } from "../connection";
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { Genres } from "./genres";
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
      comment: "FK to owner user of profile information.",
    },
    idCurrentState: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1,
      comment: "FK to current status.",
    },
    idGenre: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1,
      comment: "FK to genre.",
    },
    photoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
      comment: "The url to profile photo.",
    },
    bornDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "Born date to identify if the user is of legal age",
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
      comment: "Number of times the user has been engaged in an adventure and he arrived late.",
    },
    numMissing: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
      comment: "Number of times the user has been engaged in an adventure and he did not attend.",
    },
  },
  {
    paranoid: true,
    timestamps: true,
    underscored: true,
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

ProfileInformation.belongsTo(Genres, {
  foreignKey: "idGenre",
});

Genres.hasMany(ProfileInformation, {
  foreignKey: "idGenre",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

export { ProfileInformation };
