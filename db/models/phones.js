"use strict";
const { Model } = require("sequelize");
const uuid = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class Phones extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users, {
        foreignKey: "id_user",
      });

      models.Users.hasMany(this, {
        as: "phones",
        foreignKey: "id_user",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  Phones.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique: true,
        allowNull: false,
        defaultValue: () => uuid.v4(),
        validate: {
          isUUID: 4,
        },
        comment: "PK, unique identifier.",
      },
      id_user: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          isUUID: 4,
        },
        comment: "FK to owner user of the phone number.",
      },
      country_code: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 593,
        validate: {
          notNull: true,
          min: 0,
        },
      },
      phone_number: {
        type: DataTypes.STRING(15),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
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
      sequelize,
      modelName: "Phones",
      tableName: "phones",
    }
  );
  return Phones;
};
