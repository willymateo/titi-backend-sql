const jwt = require("jsonwebtoken");
const { User_roles } = require("../../db/models");

const verifyTokenNormal = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.toLowerCase().startsWith("bearer")) {
    return res.status(401).send({
      error: "Token missing or invalid",
    });
  }
  //Skip the Bearer word.
  const token = authorization.substring(7);

  jwt.verify(
    token,
    process.env.TOKEN_PRIVATE_KEY,
    async (err, decodedToken) => {
      if (err) {
        console.log(err);
        return res.status(401).send({
          error: "Token missing or invalid",
        });
      }

      req.decodedToken = decodedToken;
      next();
    }
  );
};

const verifyTokenAdmin = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.toLowerCase().startsWith("bearer")) {
    return res.status(401).send({
      error: "Token missing or invalid",
    });
  }

  //Skip the Bearer word.
  const token = authorization.substring(7);

  jwt.verify(
    token,
    process.env.TOKEN_PRIVATE_KEY,
    async (err, decodedToken) => {
      if (err) {
        console.log(err);
        return res.status(401).send({
          error: "Token missing or invalid",
        });
      }

      const user_rol_result = await User_roles.findOne({
        where: { id: decodedToken.id_rol, rol: "administrator" },
      });

      if (user_rol_result === null) {
        return res.status(403).send({
          error: "You don't have enough privileges.",
        });
      }

      req.decodedToken = decodedToken;
      next();
    }
  );
};

module.exports = {
  verifyTokenNormal,
  verifyTokenAdmin,
};
