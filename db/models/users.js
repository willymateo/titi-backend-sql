"use strict";
const { Model } = require("sequelize");
const uuid = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User_roles, {
        foreignKey: "id_rol",
      });

      models.User_roles.hasMany(this, {
        foreignKey: "id_rol",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      this.belongsTo(models.User_states, {
        foreignKey: "id_current_state",
      });

      models.User_states.hasMany(this, {
        foreignKey: "id_current_state",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Users.init(
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
      id_rol: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 1,
        comment: "FK to current user rol.",
      },
      id_current_state: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 1,
        comment: "FK to current status.",
      },
      username: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
        validate: {
          is: /^[a-z0-9_]*[a-z]+[a-z0-9_]*$/i,
          isLowercase: true,
          len: [5, 30],
          notNull: true,
          notEmpty: true,
        },
        comment:
          "Unique. Must contain between 5-30 characters. The allow characters are letters in lowercase, numbers and underscores. It must contain at least 1 letter in lowercase.",
      },
      password_hash: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
        comment: "Encrypted password.",
      },
      first_names: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      last_names: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
        comment: "Email linked with the account. It must be unique.",
      },
      photo_url: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true,
        },
        comment: "The url to profile photo.",
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
        },
        comment: "User description or biography.",
      },
      num_later: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
        comment:
          "Number of times the user has been engaged in an adventure and he arrived late.",
      },
      num_missing: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
        comment:
          "Number of times the user has been engaged in an adventure and he did not attend.",
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
      modelName: "Users",
      tableName: "users",
    }
  );
  return Users;
};
