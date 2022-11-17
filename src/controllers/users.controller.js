import { adventureToJson, userToJson } from "./json/users.converter";
import { Locations } from "../db/models/locations";
import { Phones } from "../db/models/phones";
import { Users } from "../db/models/users";

const getAllUsers = async (req, res) => {
  try {
    let usersResult = await Users.findAll();
    usersResult = await Promise.all(
      usersResult.map(async user => {
        const userJSON = await userToJson(user);

        if (userJSON.error) {
          throw userJSON.error;
        }

        return userJSON;
      })
    );

    return res.status(200).send(usersResult);
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

    const userJSON = await userToJson(user);

    if (userJSON.error) {
      throw userJSON.error;
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
        const adventureJSON = await adventureToJson(adventure);

        if (adventureJSON.error) {
          throw adventureJSON.error;
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
    const { password, phone: newPhoneData, location: newLocationData, ...newUserData } = req.body;

    const passwordHash = await Users.encryptPassword(password);

    if (!Users.isOfLegalAge(newUserData.bornDate)) {
      return res.status(400).send({
        error: "The new user are not of legal age",
      });
    }

    const newUserInstance = Users.build({ ...newUserData, passwordHash });
    const newPhoneInstance = Phones.build({
      ...newPhoneData,
      idUser: newUserInstance.id,
    });
    const newLocationInstance = Locations.build({
      ...newLocationData,
      idUser: newUserInstance.id,
    });

    // Validate data
    await Promise.all([
      newUserInstance.validate(),
      newPhoneInstance.validate(),
      newLocationInstance.validate(),
    ]);

    // Save the registers in the DB
    await newUserInstance.save();
    await Promise.all([newPhoneInstance.save(), newLocationInstance.save()]);

    req.tokenPayload = { id: newUserInstance.id };
    next();
  } catch (error) {
    console.log(error);
    return res.status(409).send({ error: `${error.name} - ${error.message}` });
  }
};

export { createUser, getAllUsers, getUserByUsername, getAdventuresByUsername };
