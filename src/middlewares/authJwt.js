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
        throw error;
      }

      const user = await Users.findByPk(decodedToken.id, {});

      // Verify valid user id
      if (!user) {
        return res.status(401).send({
          error: "Token missing or invalid",
        });
      }

      req.decodedToken = decodedToken;
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(409).send({ error: `${error.name} - ${error.message}` });
  }
};

export { verifyToken };
