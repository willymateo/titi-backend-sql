import { jwtSecret } from "../../config/app.config";
import { Users } from "../models/users";
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
      console.log(err);
      return res.status(409).send({
        error: `Some error occurred while verifying token: ${err}`,
      });
    }

    try {
      const user = await Users.findOne({
        where: {
          id: decodedToken.id,
          deletedAt: null,
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
      console.log(err);
      return res.status(409).send({
        error: `Some error occurred while validating the user role: ${err}`,
      });
    }
  });
};

const verifyRolAdmin = async (req, res, next) => {
  const { id } = req.decodedToken;
  const user = await Users.findOne({
    where: {
      id,
      deletedAt: null,
    },
  });

  const userRole = await user.getUser_role({
    where: {
      deletedAt: null,
    },
  });

  if (userRole.role !== "administrator") {
    return res.status(403).send({
      error: "You don't have enough privileges.",
    });
  }
  next();
};

export { verifyToken, verifyRolAdmin };
