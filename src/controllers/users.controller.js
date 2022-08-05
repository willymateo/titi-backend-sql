import { ProfileInformation } from "../db/models/profileInformation";
import { Locations } from "../db/models/locations";
import { jwtSecret } from "../config/app.config";
import { Phones } from "../db/models/phones";
import { Users } from "../db/models/users";
import jwt from "jsonwebtoken";

const getAllUsers = async (req, res) => {
  try {
    let usersResult = await Users.findAll({
      attributes: ["id", "username", "firstNames", "lastNames", "email"],
    });

    // Not found users.
    if (!usersResult) {
      return res.status(404).send({
        error: "Users not found",
      });
    }

    usersResult = await Promise.all(
      usersResult.map(async userResult => {
        const phoneResult = await userResult.getPhones({
          attributes: ["id", "countryCode", "phoneNumber"],
        });

        const locationResult = await userResult.getLocations({
          attributes: ["id", "latitude", "longitude"],
        });

        const profileInformationResult = await userResult.getProfileInformation({
          attributes: [
            "id",
            "idCurrentState",
            "idGenre",
            "photoUrl",
            "bornDate",
            "biography",
            "numLater",
            "numMissing",
          ],
        });

        const userStateResult = await profileInformationResult.getUserState({
          attributes: ["id", "state"],
        });

        const userGenre = await profileInformationResult.getGenre({
          attributes: ["genre"],
        });

        return {
          ...userResult.dataValues,
          phone: phoneResult[0],
          location: locationResult[0],
          profileInformation: {
            id: profileInformationResult.id,
            currentState: userStateResult,
            genre: userGenre.genre,
            photoUrl: profileInformationResult.photoUrl,
            bornDate: profileInformationResult.bornDate,
            biography: profileInformationResult.biography,
            numLater: profileInformationResult.numLater,
            numMissing: profileInformationResult.numMissing,
          },
        };
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

  try {
    const userResult = await Users.findOne({
      where: { username },
      attributes: ["id", "username", "firstNames", "lastNames", "email"],
    });

    // Not found user.
    if (!userResult) {
      return res.status(404).send({
        error: `User '${username}' not found`,
      });
    }

    const phoneResult = await userResult.getPhones({
      attributes: ["id", "countryCode", "phoneNumber"],
    });

    const locationResult = await userResult.getLocations({
      attributes: ["id", "latitude", "longitude"],
    });

    const profileInformationResult = await userResult.getProfileInformation({
      attributes: [
        "id",
        "idCurrentState",
        "idGenre",
        "photoUrl",
        "bornDate",
        "biography",
        "numLater",
        "numMissing",
      ],
    });

    const userStateResult = await profileInformationResult.getUserState({
      attributes: ["id", "state"],
    });

    const userGenre = await profileInformationResult.getGenre({
      attributes: ["id", "genre"],
    });

    return res.status(200).send({
      ...userResult.dataValues,
      phone: phoneResult[0],
      location: locationResult[0],
      profileInformation: {
        id: profileInformationResult.id,
        currentState: userStateResult,
        genre: userGenre.genre,
        photoUrl: profileInformationResult.photoUrl,
        bornDate: profileInformationResult.bornDate,
        biography: profileInformationResult.biography,
        numLater: profileInformationResult.numLater,
        numMissing: profileInformationResult.numMissing,
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
    if (!ProfileInformation.isOfLegalAge(newProfileInformationData.bornDate)) {
      return res.status(400).send({
        error: "The new user are not of legal age",
      });
    }

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

    // Validate data
    await Promise.all([
      newUserInstance.validate(),
      newPhoneInstance.validate(),
      newLocationInstance.validate(),
      newProfileInformationInstance.validate(),
    ]);

    // Save the registers in the DB
    await newUserInstance.save();
    await Promise.all([
      newPhoneInstance.save(),
      newLocationInstance.save(),
      newProfileInformationInstance.save(),
    ]);
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
    return res.status(201).send({
      message: `Success sign up`,
      token,
    });
  });
};

const updateUser = async (req, res) => {
  const { idUser } = req.params;

  try {
    const userResult = await Users.findOne({
      where: { id: idUser },
    });

    // Not found user.
    if (userResult === null) {
      return res.status(404).send({
        error: `User ID:${idUser} not found`,
      });
    }

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
