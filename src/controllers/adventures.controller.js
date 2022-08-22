import { Adventures } from "../db/models/adventures";
import { parseISO } from "date-fns";

const getAllAdventures = async (req, res) => {
  try {
    let allAdventures = await Adventures.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
      },
    });

    allAdventures = await Promise.all(
      allAdventures.map(async adventure => {
        const publisher = await adventure.getUser({
          attributes: {
            exclude: ["passwordHash", "createdAt", "updatedAt", "deletedAt"],
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
          },
        };
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
  try {
    const { idAdventure } = req.params;
    const adventure = await Adventures.findOne({
      where: { id: idAdventure },
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
      },
    });

    if (!adventure) {
      return res.status(404).send({
        error: `Adventure with id=${idAdventure} not found`,
      });
    }

    const publisher = await adventure.getUser({
      attributes: {
        exclude: ["passwordHash", "createdAt", "updatedAt", "deletedAt"],
      },
    });

    const adventureState = await adventure.getAdventureState({
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
      },
    });

    const adventureData = {
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
      },
    };

    return res.status(200).send(adventureData);
  } catch (err) {
    console.log(err);
    return res.status(409).send({
      error: `Some error occurred: ${err}`,
    });
  }
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

export { getAllAdventures, getAdventureById, createAdventure };
