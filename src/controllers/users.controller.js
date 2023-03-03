import { adventureToJson, userToJson } from "./json/users.converter";
import { Locations } from "../db/models/locations";
import { Users } from "../db/models/users";

const getAllUsers = async (req, res) => {
  try {
    let users = await Users.findAll();
    users = await Promise.all(
      users.map(async user => {
        const { error, ...userJSON } = await userToJson(user);

        if (error) {
          throw error;
        }

        return userJSON;
      })
    );

    return res.status(200).send(users);
  } catch (error) {
    console.log(error);
    return res.status(409).send({ error: `${error.name} - ${error.message}` });
  }
};

const getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await Users.findOne({
      where: { username },
      attributes: { exclude: ["idRole", "passwordHash", "createdAt", "updatedAt", "deletedAt"] },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const { error, ...userJSON } = await userToJson(user);

    if (error) {
      throw error;
    }

    return res.status(200).send(userJSON);
  } catch (error) {
    console.log(error);
    return res.status(409).send({ error: `${error.name} - ${error.message}` });
  }
};

const getAdventuresByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await Users.findOne({
      where: { username },
      attributes: ["id"],
    });

    if (!user) {
      throw new Error("User not found");
    }

    let adventures = await user.getAdventures({
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
      },
    });

    adventures = await Promise.all(
      adventures.map(async adventure => {
        const { error, ...adventureJSON } = await adventureToJson(adventure);

        if (error) {
          throw error;
        }

        return adventureJSON;
      })
    );

    return res.status(200).send(adventures);
  } catch (error) {
    console.log(error);
    return res.status(409).send({ error: `${error.name} - ${error.message}` });
  }
};

const createUser = async (req, res, next) => {
  try {
    const { password, location: newLocationData, ...newUserData } = req.body;

    const passwordHash = await Users.encryptPassword(password);

    if (!Users.isOfLegalAge(newUserData.bornDate)) {
      return res.status(400).send({
        error: "The new user are not of legal age",
      });
    }

    const newUserInstance = Users.build({ ...newUserData, passwordHash });
    const newLocationInstance = Locations.build({
      ...newLocationData,
      idUser: newUserInstance.id,
    });

    // Validate data
    await Promise.all([newUserInstance.validate(), newLocationInstance.validate()]);

    // Save the registers in the DB
    await newUserInstance.save();
    await newLocationInstance.save();

    req.tokenPayload = { id: newUserInstance.id };
    req.onSucessMessage = "Success sign up";
    req.onSucessCode = 201;
    next();
  } catch (error) {
    console.log(error);
    return res.status(409).send({ error: `${error.name} - ${error.message}` });
  }
};

export { createUser, getAllUsers, getUserByUsername, getAdventuresByUsername };
