import { jwtSecret } from "../config/app.config";
import { Users } from "../db/models/users";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Users.findOne({
      where: { username },
    });

    // Not signed up user.
    if (!user) {
      return res.status(401).send({
        error: "Invalid username or password",
      });
    }

    const matchPassword = await user.comparePassword(password);
    // Incorrect password.
    if (!matchPassword) {
      return res.status(401).send({
        error: "Invalid username or password",
      });
    }

    // Token creation.
    const payload = { id: user.id };

    jwt.sign(payload, jwtSecret, (error, token) => {
      if (error) {
        console.log(error);
        return res.status(409).send({ error: `${error.name} - ${error.message}` });
      }

      return res.status(200).send({
        message: "Success authentication",
        token,
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(409).send({ error: `${error.name} - ${error.message}` });
  }
};

export { login };
