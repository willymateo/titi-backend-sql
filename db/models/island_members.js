"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Island_members extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Islands, {
        foreignKey: "id_island",
      });

      models.Islands.hasMany(this, {
        foreignKey: "id_island",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      this.belongsTo(models.Users, {
        foreignKey: "id_user",
      });

      models.Users.hasMany(this, {
        foreignKey: "id_user",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  Island_members.init(
    {
      id_island: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        unique: "compositeIndex",
        validate: {
          isUUID: 4,
        },
        comment: "PK, composite unique identifier. FK to an island.",
      },
      id_user: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        unique: "compositeIndex",
        validate: {
          isUUID: 4,
        },
        comment:
          "PK, composite unique identifier. FK to an user member of the island.",
      },
      is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
      sequelize,
      modelName: "Island_members",
      tableName: "island_members",
    }
  );
  return Island_members;
};
