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

export { createUserSchema, updateUserSchema };
