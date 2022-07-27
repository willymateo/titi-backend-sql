import { AdventureStates } from "../db/models/adventureStates";
import { UserStates } from "../db/models/userStates";
import { UserRoles } from "../db/models/userRoles";
import { Genres } from "../db/models/genres";

// Load other models
import "../db/models/engagedUsersAdventures";
import "../db/models/profileInformation";
import "../db/models/islandMembers";
import "../db/models/adventures";
import "../db/models/locations";
import "../db/models/islands";
import "../db/models/phones";
import "../db/models/users";

const createUserRoles = async () =>
  Promise.all([
    UserRoles.findOrCreate({
      where: {
        role: "normal_user",
      },
      defaults: {
        role: "normal_user",
        description: "Web user or client.",
      },
    }),

    UserRoles.findOrCreate({
      where: {
        role: "administrator",
      },
      defaults: {
        role: "administrator",
        description: "Staff member, Data Base and web administrator.",
      },
    }),
  ]);

const createUserStates = async () =>
  Promise.all([
    UserStates.findOrCreate({
      where: {
        state: "available",
      },
      defaults: {
        state: "available",
        description:
          "User who have not any adventures published with open state or who have not engaged with other user.",
      },
    }),

    UserStates.findOrCreate({
      where: {
        state: "looking_for",
      },
      defaults: {
        state: "looking_for",
        description: "User who have any adventures published with open state.",
      },
    }),

    UserStates.findOrCreate({
      where: {
        state: "engaged_temporarily",
      },
      defaults: {
        state: "engaged_temporarily",
        description:
          "User who have engaged with other user in an adventure published by himself or by other user.",
      },
    }),
  ]);

const createGenres = async () =>
  Promise.all([
    Genres.findOrCreate({
      where: {
        genre: "not_specified",
      },
      defaults: {
        genre: "not_specified",
      },
    }),

    Genres.findOrCreate({
      where: {
        genre: "male",
      },
      defaults: {
        genre: "male",
      },
    }),

    Genres.findOrCreate({
      where: {
        genre: "female",
      },
      defaults: {
        genre: "female",
      },
    }),
  ]);

const createAdventureStates = async () =>
  Promise.all([
    AdventureStates.findOrCreate({
      where: {
        state: "open",
      },
      defaults: {
        state: "open",
        description:
          "No one has yet been involved in the adventure. The first and default state of an adventure.",
      },
    }),

    AdventureStates.findOrCreate({
      where: {
        state: "taken",
      },
      defaults: {
        state: "taken",
        description:
          "A user or user group have engaged in the adventure. Invitations for the adventure have been exhausted because the number of invitations is equal to the engaged users.",
      },
    }),

    AdventureStates.findOrCreate({
      where: {
        state: "close_success",
      },
      defaults: {
        state: "close_success",
        description:
          "The adventure is finished. All (or at least one) invited users attended to the adventure.",
      },
    }),

    AdventureStates.findOrCreate({
      where: {
        state: "close_unsuccess",
      },
      defaults: {
        state: "close_unsuccess",
        description:
          "The time of the publication of the adventure has run out and no one has engaged. None of the users who engaged to the adventure attended. The publisher user canceled the adventure.",
      },
    }),
  ]);

export { createUserRoles, createUserStates, createGenres, createAdventureStates };
