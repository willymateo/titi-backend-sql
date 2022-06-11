import { jwtSecret } from "../config/app.config";
import { Users } from "../db/models/users";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({
      error: "Incomplete credentials. Should receive 'username' and 'password' params",
    });
  }

  try {
    const userResult = await Users.findOne({
      where: { username },
    });

    // Not signed up user.
    if (!userResult) {
      return res.status(401).send({
        error: `Invalid username or password`,
      });
    }

    const matchPassword = await userResult.comparePassword(password);
    // Incorrect password.
    if (!matchPassword) {
      return res.status(401).send({
        error: `Invalid username or password`,
      });
    }

    // Token creation.
    const payload = {
      id: userResult.id,
    };

    jwt.sign(payload, jwtSecret, (err, token) => {
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
};

export { login };
