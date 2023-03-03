import { adventureToJson } from "./users.converter";

const adventureWithPublisherToJson = async adventure => {
  try {
    const { error, ...adventureJSON } = await adventureToJson(adventure);

    if (error) {
      throw error;
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
        currentState: publisherState,
        idCurrentState: undefined,
        gender: publisherGender,
        idGender: undefined,
      },
    };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export { adventureWithPublisherToJson };
