import { Adventures } from "../db/models/adventures";
import { parseISO } from "date-fns";

const getAllAdventures = async (req, res) => {
  try {
    let allAdventures = await Adventures.findAll();
    allAdventures = await Promise.all(
      allAdventures.map(async ({ dataValues: { id } }) => {
        const adventure = await getAventureByIdJSON(id);

        if (adventure.error) {
          throw adventure.error;
        }

        return adventure;
      })
    );
    return res.status(200).send(allAdventures);
  } catch (err) {
    console.log(err);
    return res.status(409).send({
      error: `Some error occurred: ${err}`,
    });
  }
};

const getAdventureById = async (req, res) => {
  const { idAdventure } = req.params;
  const adventure = await getAventureByIdJSON(idAdventure);

  if (adventure.error) {
    return res.status(409).send({
      error: `Some error occurred: ${adventure.error}`,
    });
  }

  return res.status(200).send(adventure);
};

const createAdventure = async (req, res) => {
  try {
    const startDateTime = parseISO(req.body.startDateTime);
    const endDateTime = parseISO(req.body.endDateTime);
    const newAdventureData = {
      numInvitations: req.body.numInvitations,
      description: req.body.description,
      idPublisher: req.decodedToken.id,
      title: req.body.title,
      startDateTime,
      endDateTime,
    };
    const newAdventureInstance = Adventures.build(newAdventureData);
    // Validate data
    await newAdventureInstance.validate();
    // Save the register in the DB
    await newAdventureInstance.save();
    return res.status(200).send({
      message: "Adventure created successfully",
      id: newAdventureInstance.id,
    });
  } catch (err) {
    console.log(err);
    return res.status(409).send({
      error: `Some error occurred while creating the new adventure: ${err}`,
    });
  }
};

const getAventureByIdJSON = async id => {
  try {
    const adventure = await Adventures.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
      },
    });

    // Not found
    if (!adventure) {
      return { error: `adventure with id=${id} not found` };
    }

    const publisher = await adventure.getUser({
      attributes: {
        exclude: ["passwordHash", "createdAt", "updatedAt", "deletedAt"],
      },
    });

    const profileInformation = await publisher.getProfileInformation({
      attributes: {
        exclude: ["idUser", "createdAt", "updatedAt", "deletedAt"],
      },
    });

    const publisherState = await profileInformation.getUserState({
      attributes: {
        exclude: ["idUser", "createdAt", "updatedAt", "deletedAt"],
      },
    });

    const publisherGender = await profileInformation.getGender({
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
      },
    });

    const adventureState = await adventure.getAdventureState({
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
      },
    });

    return {
      id: adventure.id,
      title: adventure.title,
      description: adventure.description,
      startDateTime: adventure.startDateTime,
      endDateTime: adventure.endDateTime,
      numInvitations: adventure.numInvitations,
      status: adventureState,
      publisher: {
        id: publisher.id,
        username: publisher.username,
        firstNames: publisher.firstNames,
        lastNames: publisher.lastNames,
        email: publisher.email,
        profileInformation: {
          id: profileInformation.id,
          photoUrl: profileInformation.photoUrl,
          bornDate: profileInformation.bornDate,
          biography: profileInformation.biography,
          numLater: profileInformation.numLater,
          numMissing: profileInformation.numMissing,
          currentState: publisherState,
          gender: publisherGender,
        },
      },
    };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export { getAllAdventures, getAdventureById, createAdventure };
