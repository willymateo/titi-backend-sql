import { ProfileInformation } from "../db/models/profileInformation";
import { Locations } from "../db/models/locations";
import { jwtSecret } from "../config/app.config";
import { Phones } from "../db/models/phones";
import { Users } from "../db/models/users";
import jwt from "jsonwebtoken";

const getAllUsers = async (req, res) => {
  try {
    let usersResult = await Users.findAll({
      where: { deletedAt: null },
      attributes: {
        exclude: ["id_role", "password_hash", "createdAt", "updatedAt", "deletedAt"],
      },
    });

    // Not found users.
    if (usersResult === null) {
      return res.status(404).send({
        error: "Users not found",
      });
    }

    usersResult = await Promise.all(
      usersResult.map(async userResult => {
        const phoneResult = await userResult.getPhones({
          where: { deletedAt: null },
          attributes: {
            exclude: ["id_user", "createdAt", "updatedAt", "deletedAt"],
          },
        });

        const locationResult = await userResult.getLocations({
          where: { isCurrent: true, deletedAt: null },
          attributes: {
            exclude: ["id_user", "createdAt", "updatedAt", "deletedAt"],
          },
        });

        const profileInformationResult = await userResult.getProfileInformation({
          where: { deletedAt: null },
          attributes: {
            exclude: ["id_user", "createdAt", "updatedAt", "deletedAt"],
          },
        });

        const userStateResult = await profileInformationResult.getUserState({
          where: { deletedAt: null },
          attributes: {
            exclude: ["description", "createdAt", "updatedAt", "deletedAt"],
          },
        });

        return {
          ...userResult.dataValues,
          phones: phoneResult,
          location: locationResult[0].dataValues,
          profileInformation: {
            id: profileInformationResult.id,
            photoUrl: profileInformationResult.photoUrl,
            biography: profileInformationResult.biography,
            numLater: profileInformationResult.numLater,
            numMissing: profileInformationResult.numMissing,
            userState: userStateResult.dataValues,
          },
        };
      })
    );

    return res.status(200).send(usersResult);
  } catch (err) {
    console.log(err);
    return res.status(409).send({
      error: `Some error occurred while creating the users: ${err}`,
    });
  }
};

const getUserByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const userResult = await Users.findOne({
      where: { username, deletedAt: null },
      attributes: {
        exclude: ["id_role", "password_hash", "createdAt", "updatedAt", "deletedAt"],
      },
    });

    // Not found user.
    if (userResult === null) {
      return res.status(404).send({
        error: `User '${username}' not found`,
      });
    }

    const phoneResult = await userResult.getPhones({
      where: { deletedAt: null },
      attributes: {
        exclude: ["id_user", "createdAt", "updatedAt", "deletedAt"],
      },
    });

    const locationResult = await userResult.getLocations({
      where: { isCurrent: true, deletedAt: null },
      attributes: {
        exclude: ["id_user", "createdAt", "updatedAt", "deletedAt"],
      },
    });

    const profileInformationResult = await userResult.getProfileInformation({
      where: { deletedAt: null },
      attributes: {
        exclude: ["id_user", "createdAt", "updatedAt", "deletedAt"],
      },
    });

    const userStateResult = await profileInformationResult.getUserState({
      where: { deletedAt: null },
      attributes: {
        exclude: ["description", "createdAt", "updatedAt", "deletedAt"],
      },
    });

    return res.status(200).send({
      ...userResult.dataValues,
      phones: phoneResult,
      location: locationResult[0],
      profileInformation: {
        id: profileInformationResult.id,
        photoUrl: profileInformationResult.photoUrl,
        biography: profileInformationResult.biography,
        numLater: profileInformationResult.numLater,
        numMissing: profileInformationResult.numMissing,
        userState: userStateResult.dataValues,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(409).send({
      error: `Some error occurred while getting the user '${username}': ${err}`,
    });
  }
};

const createUser = async (req, res) => {
  const { phone: newPhoneData } = req.body;
  const { location: newLocationData } = req.body;
  const { profileInformation: newProfileInformationData } = req.body;
  const passwordHash = await Users.encryptPassword(req.body.password);
  const newUserData = {
    username: req.body.username,
    passwordHash,
    firstNames: req.body.firstNames,
    lastNames: req.body.lastNames,
    email: req.body.email,
  };

  let newUserInstance;
  let newPhoneInstance;
  let newLocationInstance;
  let newProfileInformationInstance;

  try {
    newUserInstance = Users.build(newUserData);
    newPhoneInstance = Phones.build({
      ...newPhoneData,
      idUser: newUserInstance.id,
    });
    newLocationInstance = Locations.build({
      ...newLocationData,
      idUser: newUserInstance.id,
    });
    newProfileInformationInstance = ProfileInformation.build({
      ...newProfileInformationData,
      idUser: newUserInstance.id,
    });

    // Validatos
    await newUserInstance.validate();
    await newPhoneInstance.validate();
    await newLocationInstance.validate();
    await newProfileInformationInstance.validate();

    // Save the registers in the DB
    await newUserInstance.save();
    await newPhoneInstance.save();
    await newLocationInstance.save();
    await newProfileInformationInstance.save();
  } catch (err) {
    console.log(err);
    return res.status(409).send({
      error: `Some error occurred while creating the user '${newUserData.username}': ${err}`,
    });
  }

  // Token creation.
  const payload = {
    id: newUserInstance.id,
  };

  jwt.sign(payload, jwtSecret, async (err, token) => {
    if (err) {
      console.log(err);
      return res.status(500).send({
        error: `Some error occurred while signing in: ${err}`,
      });
    }

    // Return the token.
    return res.status(200).send({
      message: `Success sign up`,
      token,
    });
  });
};

const updateUser = async (req, res) => {
  const { idUser } = req.params;

  // Verify if the user in the token is the same that the user that is trying to update.
  if (idUser !== req.decodedToken.id) {
    return res.status(401).send({
      error: `You don't have enough privileges to update the user ID: ${idUser}`,
    });
  }

  // Empty body.
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      error: `You must send at least one parameter to update the user`,
    });
  }

  try {
    const userResult = await Users.findOne({
      where: { id: idUser, deletedAt: null },
    });

    // Not found user.
    if (userResult === null) {
      return res.status(404).send({
        error: `User ID:${idUser} not found`,
      });
    }

    if (req.body.username) {
      userResult.set({ username: req.body.username });
    }

    if (req.body.password) {
      const passwordHash = await Users.encryptPassword(req.body.password);
      userResult.set({ passwordHash });
    }

    if (req.body.firstNames) {
      userResult.set({ firstNames: req.body.firstNames });
    }

    if (req.body.lastNames) {
      userResult.set({ lastNames: req.body.lastNames });
    }

    if (req.body.email) {
      userResult.set({ email: req.body.email });
    }

    await userResult.validate();
    await userResult.save();
    return res.status(200).send({
      message: `User ID:${idUser} updated successfully`,
    });
  } catch (err) {
    console.log(err);
    return res.status(409).send({
      error: `Some error occurred while updating the user ID:${idUser}: ${err}`,
    });
  }
};

export { createUser, updateUser, getAllUsers, getUserByUsername };
