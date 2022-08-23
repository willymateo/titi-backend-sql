"use strict";
import { saltRounds } from "../../config/app.config";
import { sequelize } from "../connection";
import { UserRoles } from "./userRoles";
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const Users = sequelize.define(
  "Users",
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
    idRole: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "FK to current user role.",
    },
    username: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      validate: {
        is: /^[a-z0-9_\.]*[a-z]+[a-z0-9_\.]*$/,
        isLowercase: true,
        len: [5, 30],
        notNull: true,
        notEmpty: true,
      },
      comment:
        "Unique. Must contain between 5-30 characters. The allow characters are letters in lowercase, numbers and underscores. It must contain at least 1 letter in lowercase.",
    },
    passwordHash: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
      comment: "Encrypted password.",
    },
    firstNames: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    lastNames: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notNull: true,
        notEmpty: true,
      },
      comment: "Email linked with the account. It must be unique.",
    },
  },
  {
    paranoid: true,
    timestamps: true,
    underscored: true,
    tableName: "users",
    comment: "Users accounts information.",
  }
);

Users.belongsTo(UserRoles, {
  foreignKey: "idRole",
});

UserRoles.hasMany(Users, {
  foreignKey: "idRole",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

Users.encryptPassword = async password => {
  return await bcrypt.hash(password, saltRounds);
};

Users.prototype.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.passwordHash);
};

// Hooks
Users.beforeValidate(async (user, options) => {
  if (!user.idRole) {
    const normalRole = await UserRoles.findOne({
      where: { role: "normal_user" },
    });
    user.idRole = normalRole.id;
  }
});

Users.beforeCreate(async (user, options) => {
  if (!user.idRole) {
    const normalRole = await UserRoles.findOne({
      where: { role: "normal_user" },
    });
    user.idRole = normalRole.id;
  }
});

// To correct
// Users.afterDestroy(async (user, options) => {
// const profileInformation = await user.getProfileInformation();
// if (profileInformation) {
// await profileInformation.destroy();
// }

// const locations = await user.getLocations();
// if (locations) {
// await locations.destroy();
// }

// const phones = await user.getPhones();
// if (phones) {
// await phones.destroy();
// }
// });

export { Users };
