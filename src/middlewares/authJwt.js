import { jwtSecret } from "../config/app.config";
import { Users } from "../db/models/users";
import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.toLowerCase().startsWith("bearer")) {
    return res.status(401).send({
      error: "Token missing or invalid",
    });
  }

  // Skip the Bearer word.
  const token = authorization.substring(7);

  jwt.verify(token, jwtSecret, async (err, decodedToken) => {
    if (err) {
      console.log("Some error occurred while verifying token", err);
      return res.status(409).send({
        error: "Token missing or invalid",
      });
    }

    try {
      const user = await Users.findOne({
        where: {
          id: decodedToken.id,
        },
      });

      // Verify valid user id
      if (!user) {
        return res.status(401).send({
          error: "Token missing or invalid",
        });
      }

      req.decodedToken = decodedToken;
      next();
    } catch (err) {
      console.log("Some error occurred while validating the user role", err);
      return res.status(409).send({
        error: "Token missing or invalid",
      });
    }
  });
};

export { verifyToken };
