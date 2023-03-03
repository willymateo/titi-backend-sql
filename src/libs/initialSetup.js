import { AdventureStates } from "../db/models/adventureStates";
import { UserStates } from "../db/models/userStates";
import { UserRoles } from "../db/models/userRoles";
import { Genders } from "../db/models/genders";

// Load other models
import "../db/models/engagedUsersAdventures";
import "../db/models/islandMembers";
import "../db/models/adventures";
import "../db/models/locations";
import "../db/models/islands";
import "../db/models/users";

const createUserRoles = async () => {
  await UserRoles.findOrCreate({
    where: {
      role: "normal",
    },
    defaults: {
      role: "normal",
      description: "Web user or client.",
    },
  });

  await UserRoles.findOrCreate({
    where: {
      role: "admin",
    },
    defaults: {
      role: "admin",
      description: "Staff member, Data Base or web administrator.",
    },
  });
};

const createUserStates = async () => {
  await UserStates.findOrCreate({
    where: {
      state: "available",
    },
    defaults: {
      state: "available",
      description:
        "User who have not any adventures published with open state or who have not engaged with other user.",
    },
  });

  await UserStates.findOrCreate({
    where: {
      state: "looking_for",
    },
    defaults: {
      state: "looking_for",
      description: "User who have any adventures published with open state.",
    },
  });

  await UserStates.findOrCreate({
    where: {
      state: "engaged_temporarily",
    },
    defaults: {
      state: "engaged_temporarily",
      description:
        "User who have engaged with other user in an adventure published by himself or by other user.",
    },
  });
};

const createGenders = async () => {
  await Genders.findOrCreate({
    where: {
      gender: "male",
    },
    defaults: {
      gender: "male",
    },
  });

  await Genders.findOrCreate({
    where: {
      gender: "female",
    },
    defaults: {
      gender: "female",
    },
  });

  await Genders.findOrCreate({
    where: {
      gender: "gay",
    },
    defaults: {
      gender: "gay",
    },
  });

  await Genders.findOrCreate({
    where: {
      gender: "lesbian",
    },
    defaults: {
      gender: "lesbian",
    },
  });

  await Genders.findOrCreate({
    where: {
      gender: "no_binary",
    },
    defaults: {
      gender: "no_binary",
    },
  });
};

const createAdventureStates = async () => {
  await AdventureStates.findOrCreate({
    where: {
      state: "open",
    },
    defaults: {
      state: "open",
      description:
        "No one has yet been involved in the adventure. The first and default state of an adventure.",
    },
  });

  await AdventureStates.findOrCreate({
    where: {
      state: "taken",
    },
    defaults: {
      state: "taken",
      description:
        "A user or user group have engaged in the adventure. Invitations for the adventure have been exhausted because the number of invitations is equal to the engaged users.",
    },
  });

  await AdventureStates.findOrCreate({
    where: {
      state: "close_success",
    },
    defaults: {
      state: "close_success",
      description:
        "The adventure is finished. All (or at least one) invited users attended to the adventure.",
    },
  });

  await AdventureStates.findOrCreate({
    where: {
      state: "close_unsuccess",
    },
    defaults: {
      state: "close_unsuccess",
      description:
        "The time of the publication of the adventure has run out and no one has engaged. None of the users who engaged to the adventure attended. The publisher user canceled the adventure.",
    },
  });
};

const initialSetup = async () =>
  Promise.all([createGenders(), createUserRoles(), createUserStates(), createAdventureStates()]);

export { initialSetup };
