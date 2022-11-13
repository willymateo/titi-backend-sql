import { Locations } from "../db/models/locations";
import { jwtSecret } from "../config/app.config";
import { Phones } from "../db/models/phones";
import { Users } from "../db/models/users";
import jwt from "jsonwebtoken";

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
  } catch (err) {
    console.log(err);
    return res.status(409).send({
      error: `Some error occurred: ${err}`,
    });
  }
};

const getUserByUsername = async (req, res) => {
  const { username } = req.params;

  const user = await Users.findOne({
    where: { username },
    attributes: { exclude: ["idRole", "passwordHash", "createdAt", "updatedAt", "deletedAt"] },
  });

  if (!user) {
    return res.status(409).send({
      error: "User not found",
    });
  }

  const userJSON = await userToJson(user);

  if (userJSON.error) {
    return res.status(409).send({
      error: `Some error occurred: ${userJSON.error}`,
    });
  }

  return res.status(200).send(userJSON);
};

const getUserByToken = async (req, res) => {
  const { id } = req.decodedToken;

  const user = await Users.findOne({
    where: { id },
    attributes: { exclude: ["idRole", "passwordHash", "createdAt", "updatedAt", "deletedAt"] },
  });

  if (!user) {
    return res.status(409).send({
      error: "User not found",
    });
  }

  const userJSON = await userToJson(user);

  if (userJSON.error) {
    return res.status(409).send({
      error: `Some error occurred: ${userJSON.error}`,
    });
  }

  return res.status(200).send(userJSON);
};

const getAdventuresByUsername = async (req, res) => {
  const { username } = req.params;

  const user = await Users.findOne({
    where: { username },
    attributes: ["id"],
  });

  if (!user) {
    return res.status(409).send({
      error: "User not found",
    });
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
};

const getAdventuresByToken = async (req, res) => {
  const { id } = req.decodedToken;

  const user = await Users.findOne({
    where: { id },
  });

  if (!user) {
    return res.status(409).send({
      error: "User not found",
    });
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
};

const uploadProfilePhoto = async (req, res) => {
  const { id } = req.decodedToken;

  const user = await Users.findOne({
    where: { id },
    attributes: ["id", "photoUrl"],
  });

  if (!user) {
    return res.status(409).send({
      error: "User not found",
    });
  }

  console.log(req.files);

  return res.status(200).send({
    message: "Photo uploaded successfully",
  });
};

const createUser = async (req, res) => {
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

    // Token creation.
    const payload = { id: newUserInstance.id };

    jwt.sign(payload, jwtSecret, async (err, token) => {
      if (err) {
        console.log(err);
        return res.status(500).send({
          error: `Some error occurred while signing in: ${err}`,
        });
      }

      // Return the token.
      return res.status(201).send({
        message: `Success sign up`,
        token,
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(409).send({
      error: `Some error occurred while creating the new user: ${err}`,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { password, ...payload } = req.body;
    const { id } = req.decodedToken;

    const user = await Users.findOne({
      where: { id },
    });

    // Not found user.
    if (!user) {
      return res.status(404).send({
        error: "User not found",
      });
    }

    user.set(payload);

    if (password) {
      const passwordHash = await Users.encryptPassword(password);
      user.set({ passwordHash });
    }

    await user.validate();
    await user.save();
    return res.status(200).send({
      message: "User updated successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(409).send({
      error: `Some error occurred while updating the user: ${err}`,
    });
  }
};

const adventureToJson = async adventure => {
  try {
    if (!adventure) {
      return { error: "adventure not found" };
    }

    const adventureState = await adventure.getAdventureState({
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
      },
    });

    return {
      id: adventure.id,
      title: adventure.title,
      description: adventure.description,
      idPublisher: adventure.idPublisher,
      startDateTime: adventure.startDateTime,
      endDateTime: adventure.endDateTime,
      numInvitations: adventure.numInvitations,
      status: adventureState,
    };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

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

    return {
      id: user.id,
      username: user.username,
      firstNames: user.firstNames,
      lastNames: user.lastNames,
      email: user.email,
      photoUrl: user.photoUrl,
      bornDate: user.bornDate,
      biography: user.biography,
      numLater: user.numLater,
      numMissing: user.numMissing,
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

export {
  createUser,
  updateUser,
  getAllUsers,
  getUserByToken,
  getUserByUsername,
  uploadProfilePhoto,
  getAdventuresByToken,
  getAdventuresByUsername,
};
