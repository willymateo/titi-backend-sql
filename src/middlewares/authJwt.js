import { jwtSecret } from "../config/app.config";
import { Users } from "../db/models/users";
import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.toLowerCase().startsWith("bearer")) {
      return res.status(401).send({
        error: "Token missing or invalid",
      });
    }

    // Skip the Bearer word.
    const token = authorization.substring(7);

    jwt.verify(token, jwtSecret, async (error, decodedToken) => {
      if (error) {
        console.log(error);
        return res.status(409).send({ error: `${error.name} - ${error.message}` });
      }

      const user = await Users.findByPk(decodedToken.id, {});

      // Verify valid user id
      if (!user) {
        return res.status(401).send({
          error: "Token missing or invalid",
        });
      }

      req.decodedToken = { ...decodedToken, user };
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(409).send({ error: `${error.name} - ${error.message}` });
  }
};

const createToken = (req, res) => {
  const message = req.onSucessMessage || "Success authentication";
  const onSucessCode = req.onSucessCode || 200;
  const payload = req.tokenPayload;

  jwt.sign(payload, jwtSecret, (error, token) => {
    if (error) {
      console.log(error);
      return res.status(409).send({ error: `${error.name} - ${error.message}` });
    }

    return res.status(onSucessCode).send({ message, token });
  });
};

export { verifyToken, createToken };
