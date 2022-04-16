const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const { Users } = require("../db/models");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({
      error:
        "Incomplete credentials. Should receive 'username' and 'password' params",
    });
  }

  try {
    const user_result = await Users.findOne({
      where: { username, deletedAt: null },
    });

    //Not signed up user.
    if (user_result === null) {
      return res.status(401).send({
        error: `Invalid username or password`,
      });
    }

    const match_password = await bcrypt.compare(
      password,
      user_result.password_hash
    );

    //Incorrect password.
    if (!match_password) {
      return res.status(401).send({
        error: `Invalid username or password`,
      });
    }

    //Token creation.
    const payload = {
      id: user_result.id,
    };

    jwt.sign(payload, process.env.TOKEN_PRIVATE_KEY, (err, token) => {
      if (err) {
        console.log(err);
        return res.status(409).send({
          error: `Some error occurred while signing in: ${err}`,
        });
      }
      return res.status(200).send({
        message: `Success authentication`,
        token,
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(409).send({
      error: `Some error occurred while authenticating user: ${err}`,
    });
  }
});

module.exports = router;
