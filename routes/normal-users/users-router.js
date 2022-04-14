const express = require("express");
const jwt = require("jsonwebtoken");
const { Users } = require("../../db/models");
const { Phones } = require("../../db/models");
const { Locations } = require("../../db/models");
const { Profile_information } = require("../../db/models");
const { verifyTokenNormal } = require("../middlewares/token-authorization");

const router = express.Router();

//Get all users.
router.get("/", verifyTokenNormal, async (req, res) => {
  let users_result = await Users.findAll({
    where: { deletedAt: null },
    attributes: {
      exclude: [
        "id_rol",
        "password_hash",
        "createdAt",
        "updatedAt",
        "deletedAt",
      ],
    },
  });

  //Not found users.
  if (users_result === null) {
    return res.status(404).send({
      error: "Users not found",
    });
  }

  users_result = await Promise.all(
    users_result.map(async user_result => {
      const phone_result = await user_result.getPhones({
        attributes: {
          exclude: ["id_user", "createdAt", "updatedAt", "deletedAt"],
        },
      });

      const location_result = await user_result.getLocations({
        where: { is_current: true },
        attributes: {
          exclude: ["id_user", "createdAt", "updatedAt", "deletedAt"],
        },
      });

      const profile_information_result =
        await user_result.getProfile_information({
          attributes: {
            exclude: ["id_user", "createdAt", "updatedAt", "deletedAt"],
          },
        });

      const user_state_result = await profile_information_result.getUser_state({
        attributes: {
          exclude: ["description", "createdAt", "updatedAt", "deletedAt"],
        },
      });

      return {
        ...user_result.dataValues,
        phones: phone_result,
        location: location_result[0].dataValues,
        profile_information: {
          id: profile_information_result.id,
          photo_url: profile_information_result.photo_url,
          description: profile_information_result.description,
          num_later: profile_information_result.num_later,
          num_missing: profile_information_result.num_missing,
          user_state: user_state_result.dataValues,
        },
      };
    })
  );

  return res.status(200).send(users_result);
});

//Get user by username.
router.get("/:username", verifyTokenNormal, async (req, res) => {
  const { username } = req.params;

  const user_result = await Users.findOne({
    where: { username, deletedAt: null },
    attributes: {
      exclude: [
        "id_rol",
        "password_hash",
        "createdAt",
        "updatedAt",
        "deletedAt",
      ],
    },
  });

  //Not found user.
  if (user_result === null) {
    return res.status(404).send({
      error: `User '${username}' not found`,
    });
  }

  const phone_result = await user_result.getPhones({
    attributes: {
      exclude: ["id_user", "createdAt", "updatedAt", "deletedAt"],
    },
  });

  const location_result = await user_result.getLocations({
    where: { is_current: true },
    attributes: {
      exclude: ["id_user", "createdAt", "updatedAt", "deletedAt"],
    },
  });

  const profile_information_result = await user_result.getProfile_information({
    attributes: {
      exclude: ["id_user", "createdAt", "updatedAt", "deletedAt"],
    },
  });

  const user_state_result = await profile_information_result.getUser_state({
    attributes: {
      exclude: ["description", "createdAt", "updatedAt", "deletedAt"],
    },
  });

  return res.status(200).send({
    ...user_result.dataValues,
    phones: phone_result,
    location: location_result[0],
    profile_information: {
      id: profile_information_result.id,
      photo_url: profile_information_result.photo_url,
      description: profile_information_result.description,
      num_later: profile_information_result.num_later,
      num_missing: profile_information_result.num_missing,
      user_state: user_state_result.dataValues,
    },
  });
});

//Create an user.
router.post("/", async (req, res) => {
  const { phone: newPhoneData } = req.body;
  const { location: newLocationData } = req.body;
  const { profile_information: newProfileInformationData } = req.body;
  const newUserData = {
    username: req.body.username,
    password_hash: req.body.password,
    first_names: req.body.first_names,
    last_names: req.body.last_names,
    email: req.body.email,
  };

  let newUserInstance;
  let newPhoneInstance;
  let newLocationInstance;
  let newProfileInformationInstance;

  try {
    newUserInstance = await Users.build(newUserData);
    newPhoneInstance = await Phones.build({
      ...newPhoneData,
      id_user: newUserInstance.id,
    });
    newLocationInstance = await Locations.build({
      ...newLocationData,
      id_user: newUserInstance.id,
    });
    newProfileInformationInstance = await Profile_information.build({
      ...newProfileInformationData,
      id_user: newUserInstance.id,
    });

    //Validatos
    await newUserInstance.validate();
    await newPhoneInstance.validate();
    await newLocationInstance.validate();
    await newProfileInformationInstance.validate();

    //Save the registers in the DB
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

  //Token creation.
  const payload = {
    id: newUserInstance.id,
    id_rol: newUserInstance.id_rol,
  };

  jwt.sign(payload, process.env.TOKEN_PRIVATE_KEY, async (err, token) => {
    if (err) {
      console.log(err);
      return res.status(500).send({
        error: `Some error occurred while signing in: ${err.message}`,
      });
    }

    //Return the token.
    return res.status(200).send({
      message: `Success sign up`,
      token,
    });
  });
});

//Update user account information.
router.put("/:id_user", verifyTokenNormal, async (req, res) => {
  const { id_user } = req.params;

  //Verify if the user in the token is the same that the user that is trying to update.
  if (id_user !== req.decodedToken.id) {
    return res.status(401).send({
      error: `You don't have enough privileges to update the user ID: ${id_user}`,
    });
  }

  //Empty body.
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      error: `You must send at least one parameter to update the user`,
    });
  }

  try {
    const user_result = await Users.findOne({
      where: { id: id_user },
      attributes: {
        exclude: ["id_rol", "password_hash", "createdAt", "deletedAt"],
      },
    });

    //Not found user.
    if (user_result === null) {
      return res.status(404).send({
        error: `User ID:${id_user} not found`,
      });
    }

    if (req.body.username) {
      user_result.set({ username: req.body.username });
    }

    if (req.body.password) {
      user_result.set({ password_hash: req.body.password });
    }

    if (req.body.first_names) {
      user_result.set({ first_names: req.body.first_names });
    }

    if (req.body.last_names) {
      user_result.set({ last_names: req.body.last_names });
    }

    if (req.body.email) {
      user_result.set({ email: req.body.email });
    }

    console.log(user_result);
    await user_result.save();
    return res.status(200).send({
      message: `User ID:${id_user} updated successfully`,
    });
  } catch (err) {
    console.log(err);
    return res.status(409).send({
      error: `Some error occurred while updating the user ID:${id_user}: ${err}`,
    });
  }
});

module.exports = router;
