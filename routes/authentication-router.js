const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const { Users } = require("../db/models");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (typeof username === "undefined" || typeof password === "undefined") {
    res.status(400).send({
      error:
        "Incomplete credentials. Should receive 'username' and 'password' params",
    });
    return;
  } else if (!username || !password) {
    res.status(400).send({
      error: "The params value can't be falsy values",
    });
    return;
  }

  const user_result = await Users.findOne({
    where: { username },
  });

  //Not signed up user.
  if (user_result === null) {
    res.status(401).send({
      error: `Invalid user or password`,
    });
    return;
  }

  const match_password = await bcrypt.compare(
    password,
    user_result.password_hash
  );

  //Incorrect password.
  if (!match_password) {
    res.status(401).send({
      error: `Invalid user or password`,
    });
    return;
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
    }
    res.status(200).send({
      message: `Success authentication`,
      token,
    });
  });
});

module.exports = router;
