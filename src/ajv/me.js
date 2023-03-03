import { USERNAME_REGEX, USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from "../config/app.config";

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
    },
    lastNames: {
      type: "string",
    },
    email: {
      type: "string",
      format: "email",
    },
    photoUrl: {
      type: "string",
      format: "url",
    },
    biography: {
      type: "string",
    },
    bornDate: {
      type: "string",
      format: "date",
    },
    idGender: {
      type: "integer",
    },
  },
};

export { updateUserSchema };
