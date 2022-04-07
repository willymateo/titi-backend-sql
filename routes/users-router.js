const express = require("express");
const jwt = require("jsonwebtoken");
const { Users } = require("../db/models");
const { Phones } = require("../db/models");
const { Locations } = require("../db/models");

const router = express.Router();

//Get all users.
//Verificar envio de mensajes de error.
router.get("/", (req, res) => {
  const { authorization } = req.headers;
  let token;

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    //Skip the Bearer word.
    token = authorization.substring(7);
  }

  jwt.verify(token, process.env.TOKEN_PRIVATE_KEY, (err, decodedToken) => {
    if (err) {
      console.log(err);
      res.status(401).send({
        error: `Token missing or invalid`,
      });
      return;
    }

    Users.findAll({
      attributes: {
        exclude: ["passwordHash", "createdAt", "updatedAt", "deletedAt"],
      },
    })
      .then(users => {
        res.status(200).send(users);
      })
      .catch(err => {
        console.log(err);
        res.status(400).send(err);
      });
  });
});

//Get user by username.
//Verificar envio de mensajes de error.
router.get("/:username", (req, res) => {
  const { username } = req.params;

  Users.findOne({
    where: { username },
    attributes: {
      exclude: ["passwordHash", "createdAt", "updatedAt", "deletedAt"],
    },
  })
    .then(user => {
      res.status(200).send(user);
    })
    .catch(err => {
      console.log(err);
      res.status(400).send(err);
    });
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
