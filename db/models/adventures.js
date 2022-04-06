"use strict";
const { Model } = require("sequelize");
const uuid = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class Adventures extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Adventure_states, {
        foreignKey: "id_status",
      });

      models.Adventure_states.hasMany(this, {
        foreignKey: "id_status",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Adventures.init(
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
      id_status: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 1,
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
      start_datetime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        comment: "The datetime when the adventure was published.",
      },
      end_datetime: {
        type: DataTypes.DATE,
        allowNull: false,
        comment:
          "The datetime when the adventure will expire. Up to 24h since the start_datetime.",
      },
      num_invitations: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 1,
        validate: {
          min: 1,
        },
        comment:
          "Number of allow users that can engaged with the adventure. This number not include the publisher user.",
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
      modelName: "Adventures",
      tableName: "adventures",
    }
  );
  return Adventures;
};
