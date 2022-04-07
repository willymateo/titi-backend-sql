"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "user_states",
      [
        {
          state: "available",
          description:
            "User who have not any adventures published with open state or who have not engaged with other user.",
        },
        {
          state: "looking_for",
          description:
            "User who have any adventures published with open state.",
        },
        {
          state: "engaged_temporarily",
          description:
            "User who have engaged with other user in an adventure published by himself or by other user.",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("user_states", null, {});
  },
};
