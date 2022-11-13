const userToJson = async user => {
  try {
    if (!user) {
      return { error: `User not found` };
    }

    const phone = await user.getPhones({
      attributes: ["id", "countryCode", "phoneNumber"],
    });

    const location = await user.getLocations({
      attributes: ["id", "latitude", "longitude"],
    });

    const userState = await user.getUserState({
      attributes: ["id", "state"],
    });

    const gender = await user.getGender({
      attributes: ["id", "gender"],
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
      currentState: userState,
      gender,
      phone: phone[0],
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

    const { id, title, description, startDateTime, endDateTime, numInvitations } = adventure;

    return {
      id,
      title,
      description,
      startDateTime,
      endDateTime,
      numInvitations,
      status: adventureState,
    };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export { userToJson, adventureToJson };
