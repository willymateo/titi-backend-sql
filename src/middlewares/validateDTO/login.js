import { USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH, USERNAME_REGEX } from "../../config/app.config";
import Ajv from "ajv";

const schema = {
  required: ["username", "password"],
  additionalProperties: false,
  type: "object",
  properties: {
    username: {
      type: "string",
      minLength: USERNAME_MIN_LENGTH,
      maxLength: USERNAME_MAX_LENGTH,
      pattern: USERNAME_REGEX,
    },
    password: {
      type: "string",
    },
  },
};

const ajv = new Ajv();
const validate = ajv.compile(schema);

const validateLoginDTO = (req, res, next) => {
  const isValid = validate(req.body);

  if (!isValid) {
    return res.status(400).send({
      error: "Invalid body schema",
    });
  }

  next();
};

export { validateLoginDTO };
