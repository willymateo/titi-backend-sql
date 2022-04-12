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
    where: { username },
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

  let profile_information_result = await user_result.getProfile_information({
    attributes: {
      exclude: ["id_user", "createdAt", "updatedAt", "deletedAt"],
    },
  });

  const user_state_result = await profile_information_result.getUser_state({
    attributes: {
      exclude: ["description", "createdAt", "updatedAt", "deletedAt"],
    },
  });

  profile_information_result = {
    id: profile_information_result.id,
    photo_url: profile_information_result.photo_url,
    description: profile_information_result.description,
    num_later: profile_information_result.num_later,
    num_missing: profile_information_result.num_missing,
    user_state: user_state_result.dataValues,
  };

  return res.status(200).send({
    ...user_result.dataValues,
    phones: phone_result,
    location: location_result[0],
    profile_information: profile_information_result,
  });
});

//Create an user.
//Check null undefined values.
//Check error messages.
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

    //Save the registers in the DB.
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
    username: newUserInstance.username,
    email: newUserInstance.email,
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

//Update an user.
router.put("/:id_usuario", (req, res) => {
  let { id_usuario } = req.params;
  let { admin } = req.body;
  let adminBoolean = admin === "1";
  let usuario_actualizado = {
    username: req.body.username,
    password: req.body.password,
    nombres: req.body.nombres,
    apellidos: req.body.apellidos,
    email: req.body.email,
    admin: adminBoolean,
    updatedAt: new Date(),
  };

  Users.update(usuario_actualizado, {
    where: { id: id_usuario },
    individualHooks: true,
  })
    .then(data => {
      if (data[0] == 1) {
        res.send({
          message: `Usuario '${id_usuario}' actualizado exitosamente`,
        });
      } else {
        res.send({
          message: `No fué posible actualizar el usuario '${id_usuario}'.`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error al actualizar el usuario '${id_usuario}'.
            Error: ${err}`,
      });
    });
});

//Delete an user.
//to chage--------------------------------------------------
router.post("/:id_usuario", function (req, res) {
  let { id_usuario } = req.params;

  Users.destroy({
    where: { id: id_usuario },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Usuario eliminado exitosamente",
        });
      } else {
        res.send({
          message: "No fué posible eliminar el usuario.",
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error al eliminar el usuario.
            Error: ${err}`,
      });
    });
});

module.exports = router;
