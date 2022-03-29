'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Experiences extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Experiences.init({
    id_publisher_user: DataTypes.STRING,
    id_status: DataTypes.INTEGER,
    start_datetime: DataTypes.DATE,
    end_datetime: DataTypes.DATE,
    num_allow_users: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Experiences',
  });
  return Experiences;
};