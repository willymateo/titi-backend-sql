import { ProfileInformation } from "../db/models/profileInformation";
import { Locations } from "../db/models/locations";
import { jwtSecret } from "../config/app.config";
import { Phones } from "../db/models/phones";
import { Users } from "../db/models/users";
import jwt from "jsonwebtoken";

const getAllUsers = async (req, res) => {
  try {
    let usersResult = await Users.findAll();
    usersResult = await Promise.all(
      usersResult.map(async ({ dataValues: { username } }) => {
        const user = await getUserByUsernameJSON(username);

        if (user.error) {
          throw user.error;
        }

        return user;
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
  const user = await getUserByUsernameJSON(username);

  if (user.error) {
    return res.status(409).send({
      error: `Some error occurred: ${user.error}`,
    });
  }

  return res.status(200).send(user);
};

const createUser = async (req, res) => {
  try {
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

    if (!ProfileInformation.isOfLegalAge(newProfileInformationData.bornDate)) {
      return res.status(400).send({
        error: "The new user are not of legal age",
      });
    }

    const newUserInstance = Users.build(newUserData);
    const newPhoneInstance = Phones.build({
      ...newPhoneData,
      idUser: newUserInstance.id,
    });
    const newLocationInstance = Locations.build({
      ...newLocationData,
      idUser: newUserInstance.id,
    });
    const newProfileInformationInstance = ProfileInformation.build({
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
  } catch (err) {
    console.log(err);
    return res.status(409).send({
      error: `Some error occurred while creating the new user: ${err}`,
    });
  }
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

const getUserByUsernameJSON = async username => {
  try {
    const user = await Users.findOne({
      where: { username },
      attributes: { exclude: ["idRole", "passwordHash", "createdAt", "updatedAt", "deletedAt"] },
    });

    // Not found
    if (!user) {
      return { error: `User ${username} not found` };
    }

    const phone = await user.getPhones({
      attributes: ["id", "countryCode", "phoneNumber"],
    });

    const location = await user.getLocations({
      attributes: ["id", "latitude", "longitude"],
    });

    const profileInformation = await user.getProfileInformation({
      attributes: {
        exclude: ["idUser", "createdAt", "updatedAt", "deletedAt"],
      },
    });

    const userState = await profileInformation.getUserState({
      attributes: ["id", "state"],
    });

    const gender = await profileInformation.getGender({
      attributes: ["id", "gender"],
    });

    return {
      ...user.dataValues,
      phone: phone[0],
      location: location[0],
      profileInformation: {
        id: profileInformation.id,
        photoUrl: profileInformation.photoUrl,
        bornDate: profileInformation.bornDate,
        biography: profileInformation.biography,
        numLater: profileInformation.numLater,
        numMissing: profileInformation.numMissing,
        currentState: userState,
        gender,
      },
    };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export { createUser, updateUser, getAllUsers, getUserByUsername };
