import { USERNAME_REGEX, USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from "../config/app.config";

const createUserSchema = {
  additionalProperties: false,
  type: "object",
  required: [
    "username",
    "password",
    "firstNames",
    "lastNames",
    "email",
    "photoUrl",
    "biography",
    "bornDate",
    "idGender",
    "location",
  ],
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
      format: "date-time",
    },
    idGender: {
      type: "integer",
    },
    location: {
      type: "object",
      required: ["latitude", "longitude"],
      properties: {
        latitude: {
          type: "string",
        },
        longitude: {
          type: "string",
        },
      },
    },
  },
};

export { createUserSchema };
