"use strict";
import { intervalToDuration, isValid, parseISO } from "date-fns";
import { UserStates } from "./userStates";
import { sequelize } from "../connection";
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { Genders } from "./genders";
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
      comment: "FK to current status.",
    },
    idGender: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "FK to gender.",
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

ProfileInformation.belongsTo(Genders, {
  foreignKey: "idGender",
});

Genders.hasMany(ProfileInformation, {
  foreignKey: "idGender",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

ProfileInformation.isOfLegalAge = bornDateString => {
  const bornDate = parseISO(bornDateString);
  if (!isValid(bornDate)) {
    return false;
  }

  const { years } = intervalToDuration({
    start: bornDate,
    end: new Date(),
  });
  return years >= 18;
};

// Hooks
ProfileInformation.beforeValidate(async (profileInformation, options) => {
  if (!profileInformation.idCurrentState) {
    const availableState = await UserStates.findOne({
      where: { state: "available" },
    });
    profileInformation.idCurrentState = availableState.id;
  }
});

ProfileInformation.beforeCreate(async (profileInformation, options) => {
  if (!profileInformation.idCurrentState) {
    const availableState = await UserStates.findOne({
      where: { state: "available" },
    });
    profileInformation.idCurrentState = availableState.id;
  }
});

export { ProfileInformation };
