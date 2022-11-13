import { adventureToJson } from "./users.converter";

const adventureWithPublisherToJson = async adventure => {
  try {
    const adventureJSON = await adventureToJson(adventure);

    if (adventureJSON.error) {
      throw adventure.error;
    }

    const publisher = await adventure.getUser({
      attributes: {
        exclude: ["idRole", "passwordHash", "createdAt", "updatedAt", "deletedAt"],
      },
    });

    const publisherState = await publisher.getUserState({
      attributes: {
        exclude: ["idUser", "description", "createdAt", "updatedAt", "deletedAt"],
      },
    });

    const publisherGender = await publisher.getGender({
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
      },
    });

    return {
      ...adventureJSON,
      publisher: {
        ...publisher.dataValues,
        idCurrentState: undefined,
        idGender: undefined,
        currentState: publisherState,
        gender: publisherGender,
      },
    };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export { adventureWithPublisherToJson };
