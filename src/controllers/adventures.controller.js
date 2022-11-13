import { adventureToJson } from "./json/adventures.converter";
import { Adventures } from "../db/models/adventures";
import { parseISO } from "date-fns";

const getAllAdventures = async (req, res) => {
  try {
    let allAdventures = await Adventures.findAll();
    allAdventures = await Promise.all(
      allAdventures.map(async adventure => {
        const adventureJSON = await adventureToJson(adventure);

        if (adventureJSON.error) {
          throw adventureJSON.error;
        }

        return adventureJSON;
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

  const adventure = await Adventures.findByPk(idAdventure, {
    attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
  });

  if (!adventure) {
    return res.status(409).send({
      error: "Adventure not found",
    });
  }

  const adventureJSON = await adventureToJson(adventure);

  if (adventureJSON.error) {
    return res.status(409).send({
      error: `Some error occurred: ${adventureJSON.error}`,
    });
  }

  return res.status(200).send(adventureJSON);
};

const createAdventure = async (req, res) => {
  try {
    const startDateTime = parseISO(req.body.startDateTime);
    const endDateTime = parseISO(req.body.endDateTime);
    const newAdventureData = {
      ...req.body,
      idPublisher: req.decodedToken.id,
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
  } catch (err) {
    console.log(err);
    return res.status(409).send({
      error: `Some error occurred while creating the new adventure: ${err}`,
    });
  }
};

export { getAllAdventures, getAdventureById, createAdventure };
