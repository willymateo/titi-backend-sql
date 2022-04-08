const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const { Users } = require("../db/models");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (typeof username === "undefined" || typeof password === "undefined") {
    return res.status(400).send({
      error:
        "Incomplete credentials. Should receive 'username' and 'password' params",
    });
  } else if (!username || !password) {
    return res.status(400).send({
      error: "The params value can't be falsy values",
    });
  }

  const user_result = await Users.findOne({
    where: { username },
  });

  //Not signed up user.
  if (user_result === null) {
    return res.status(401).send({
      error: `Invalid user or password`,
    });
  }

  const match_password = await bcrypt.compare(
    password,
    user_result.password_hash
  );

  //Incorrect password.
  if (!match_password) {
    return res.status(401).send({
      error: `Invalid user or password`,
    });
  }

  //Token creation.
  const payload = {
    id: user_result.id,
    id_rol: user_result.id_rol,
    username,
    email: user_result.email,
  };

  jwt.sign(payload, process.env.TOKEN_PRIVATE_KEY, (err, token) => {
    if (err) {
      console.log(err);
      return res.status(500).send({
        error: `Some error occurred while signing in: ${err.message}`,
      });
    }
    return res.status(200).send({
      message: `Success authentication`,
      token,
    });
  });
});

module.exports = router;
