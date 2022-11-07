import addFormats from "ajv-formats";
import Ajv from "ajv";
import {
  USERNAME_REGEX,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  LAST_NAMES_MAX_LENGTH,
  FIRST_NAMES_MAX_LENGTH,
} from "../../config/app.config";

const createUserSchema = {
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
    firstNames: {
      type: "string",
      maxLength: FIRST_NAMES_MAX_LENGTH,
    },
    lastNames: {
      type: "string",
      maxLength: LAST_NAMES_MAX_LENGTH,
    },
    email: {
      type: "string",
      format: "email",
    },
  },
};

const updateUserSchema = {
  additionalProperties: false,
  minProperties: 1,
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
    firstNames: {
      type: "string",
      maxLength: FIRST_NAMES_MAX_LENGTH,
    },
    lastNames: {
      type: "string",
      maxLength: LAST_NAMES_MAX_LENGTH,
    },
    email: {
      type: "string",
      format: "email",
    },
  },
};

const ajv = new Ajv();
addFormats(ajv, ["email"]);
const validateCreateUserAJV = ajv.compile(createUserSchema);
const validateUpdateUserAJV = ajv.compile(updateUserSchema);

const validateCreateUserDTO = (req, res, next) => {
  const isValid = validateCreateUserAJV(req.body);

  if (!isValid) {
    return res.status(400).send({
      error: "Invalid body schema",
    });
  }

  next();
};

const validateUpdateUserDTO = (req, res, next) => {
  const isValid = validateUpdateUserAJV(req.body);

  if (!isValid) {
    return res.status(400).send({
      error: "Invalid body schema",
    });
  }

  next();
};

export { validateCreateUserDTO, validateUpdateUserDTO };
