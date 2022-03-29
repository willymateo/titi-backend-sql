'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Experiences', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_publisher_user: {
        type: Sequelize.STRING
      },
      id_status: {
        type: Sequelize.INTEGER
      },
      start_datetime: {
        type: Sequelize.DATE
      },
      end_datetime: {
        type: Sequelize.DATE
      },
      num_allow_users: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Experiences');
  }
};