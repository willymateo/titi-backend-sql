import { adventureWithPublisherToJson } from "./json/adventures.converter";
import { Adventures } from "../db/models/adventures";
import { parseISO } from "date-fns";
import { Op } from "sequelize";

const getAllAdventures = async (req, res) => {
  try {
    const { id: userId } = req.decodedToken;
    let allAdventures = await Adventures.findAll({
      where: {
        idPublisher: {
          [Op.ne]: userId,
        },
      },
    });
    allAdventures = await Promise.all(
      allAdventures.map(async adventure => {
        const adventureJSON = await adventureWithPublisherToJson(adventure);

        if (adventureJSON.error) {
          throw adventureJSON.error;
        }

        return adventureJSON;
      })
    );
    return res.status(200).send(allAdventures);
  } catch (error) {
    console.log(error);
    return res.status(409).send({ error: `${error.name} - ${error.message}` });
  }
};

const getAdventureById = async (req, res) => {
  try {
    const { idAdventure } = req.params;

    const adventure = await Adventures.findByPk(idAdventure, {
      attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
    });

    if (!adventure) {
      throw new Error("Adventure not found");
    }

    const adventureJSON = await adventureWithPublisherToJson(adventure);

    if (adventureJSON.error) {
      throw new Error(adventureJSON.error);
    }

    return res.status(200).send(adventureJSON);
  } catch (error) {
    console.log(error);
    return res.status(409).send({ error: `${error.name} - ${error.message}` });
  }
};

const createAdventure = async (req, res) => {
  try {
    const { id: idPublisher } = req.decodedToken;
    const startDateTime = parseISO(req.body.startDateTime);
    const endDateTime = parseISO(req.body.endDateTime);
    const newAdventureData = {
      ...req.body,
      idPublisher,
      startDateTime,
      endDateTime,
    };

    const newAdventureInstance = Adventures.build(newAdventureData);
    // Validate data
    await newAdventureInstance.validate();
    // Save the register in the DB
    await newAdventureInstance.save();
    return res.status(201).send({
      message: "Adventure created successfully",
      id: newAdventureInstance.id,
    });
  } catch (error) {
    console.log(error);
    return res.status(409).send({ error: `${error.name} - ${error.message}` });
  }
};

const updateAdventureById = async (req, res) => {
  try {
    const { idAdventure } = req.params;

    const adventure = await Adventures.findByPk(idAdventure, {
      attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
    });

    if (!adventure) {
      throw new Error("Adventure not found");
    }

    adventure.set(req.body);

    await adventure.validate();
    await adventure.save();

    return res.status(200).send({
      message: "Adventure updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(409).send({ error: `${error.name} - ${error.message}` });
  }
};

const deleteAdventureById = async (req, res) => {
  try {
    const { idAdventure } = req.params;

    const adventure = await Adventures.findByPk(idAdventure, {
      attributes: ["id"],
    });

    if (!adventure) {
      throw new Error("Adventure not found");
    }

    await adventure.destroy();

    return res.status(200).send({
      message: "Adventure updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(409).send({ error: `${error.name} - ${error.message}` });
  }
};

export {
  updateAdventureById,
  deleteAdventureById,
  getAllAdventures,
  getAdventureById,
  createAdventure,
};
