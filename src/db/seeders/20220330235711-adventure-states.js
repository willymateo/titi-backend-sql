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
      "adventure_states",
      [
        {
          state: "open",
          description:
            "No one has yet been involved in the adventure. The first and default state of an adventure.",
        },
        {
          state: "taken",
          description:
            "A user or user group have engaged in the adventure. Invitations for the adventure have been exhausted because the number of invitations is equal to the engaged users.",
        },
        {
          state: "close_success",
          description:
            "The adventure is finished. All (or at least one) invited users attended to the adventure.",
        },
        {
          state: "close_unsuccess",
          description:
            "The time of the publication of the adventure has run out and no one has engaged. None of the users who engaged to the adventure attended. The publisher user canceled the adventure.",
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
    await queryInterface.bulkDelete("adventure_states", null, {});
  },
};
