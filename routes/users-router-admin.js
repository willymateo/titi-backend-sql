const express = require("express");
const { Users } = require("../db/models");
const { Phones } = require("../db/models");
const { Locations } = require("../db/models");
const { User_roles } = require("../db/models");
const { verifyTokenAdmin } = require("./middlewares/token-authorization");

const router = express.Router();

//Get all users.
router.get("/", verifyTokenAdmin, async (req, res) => {
  const users_result = await Users.findAll({
    attributes: {
      exclude: [
        "id_rol",
        "password_hash",
        "createdAt",
        "updatedAt",
        "deletedAt",
      ],
    },
    include: [
      {
        model: User_roles,
        as: "user_rol",
        attributes: {
          exclude: ["description", "createdAt", "updatedAt", "deletedAt"],
        },
      },
      {
        model: Locations,
        attributes: {
          exclude: ["id_user", "createdAt", "updatedAt", "deletedAt"],
        },
      },
      {
        model: Phones,
        attributes: {
          exclude: ["id_user", "createdAt", "updatedAt", "deletedAt"],
        },
      },
    ],
  });

  //Not found user.
  if (users_result === null) {
    res.status(401).send({
      error: "Users not found",
    });
    return;
  }

  res.status(200).send(users_result);
});

//Get user by username.
//Verificar token.
router.get("/:username", async (req, res) => {
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
    include: [
      {
        model: User_roles,
        as: "user_rol",
        attributes: {
          exclude: ["description", "createdAt", "updatedAt", "deletedAt"],
        },
      },
      {
        model: Locations,
        //where: { is_current: true },
        attributes: {
          exclude: ["id_user", "createdAt", "updatedAt", "deletedAt"],
        },
      },
      {
        model: Phones,
        attributes: {
          exclude: ["id_user", "createdAt", "updatedAt", "deletedAt"],
        },
      },
    ],
  });

  //Not found user.
  if (user_result === null) {
    res.status(401).send({
      error: `User '${username}' not found`,
    });
    return;
  }

  res.status(200).send(user_result);
});

//Create an user.
//Verificar el rol
//Verificar envio de mensajes de error.
//Quitar campos a enviar en la respuesta.
router.post("/", function (req, res) {
  let newUser = {
    username: req.body.username,
    password_hash: req.body.password,
    first_names: req.body.first_names,
    last_names: req.body.last_names,
    email: req.body.email,
  };

  Users.create(newUser)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the client.",
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
