import { Adventures } from "../../db/models/adventures";

const userToJson = async user => {
  try {
    if (!user) {
      return { error: `User not found` };
    }

    const location = await user.getLocations({
      attributes: ["id", "latitude", "longitude"],
    });

    const userState = await user.getUserState({
      attributes: ["id", "state"],
    });

    const gender = await user.getGender({
      attributes: ["id", "gender"],
    });

    const numAdventures = await Adventures.count({
      where: { idPublisher: user.id },
    });

    const {
      numMissing,
      firstNames,
      lastNames,
      biography,
      username,
      bornDate,
      photoUrl,
      numLater,
      email,
      id,
    } = user;

    return {
      id,
      username,
      firstNames,
      lastNames,
      email,
      photoUrl,
      bornDate,
      biography,
      numLater,
      numMissing,
      numAdventures,
      currentState: userState,
      gender,
      location: location[0],
    };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const adventureToJson = async adventure => {
  try {
    if (!adventure) {
      return { error: "adventure not found" };
    }

    const adventureState = await adventure.getAdventureState({
      attributes: {
        exclude: ["description", "createdAt", "updatedAt", "deletedAt"],
      },
    });

    const {
      numInvitations,
      startDateTime,
      endDateTime,
      description,
      longitude,
      latitude,
      title,
      id,
    } = adventure;

    return {
      status: adventureState,
      numInvitations,
      startDateTime,
      description,
      endDateTime,
      title,
      id,
      location: {
        longitude,
        latitude,
      },
    };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export { userToJson, adventureToJson };
