import { createAdventureSchema } from "../ajv/adventures";
import { createUserSchema } from "../ajv/users";
import { updateUserSchema } from "../ajv/me";
import { loginSchema } from "../ajv/login";
import addFormats from "ajv-formats";
import "dotenv/config";
import Ajv from "ajv";

// morgan
const morganFormat =
  "● [:date[iso]] [:remote-addr :remote-user] :method :url HTTP/:http-version :status :response-time ms - :res[content-length]";

// bcrypt
const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);

// JWT
const jwtSecret = process.env.JWT_SECRET;

// phone model
const DEFAULT_PHONE_COUNTRY_CODE = 593;

// user model
const USERNAME_REGEX = "^[a-z0-9_.]*[a-z]+[a-z0-9_.]*$";
const USERNAME_MAX_LENGTH = 30;
const USERNAME_MIN_LENGTH = 5;

// AJV
const ajv = new Ajv();
addFormats(ajv, ["email", "url", "date-time"]);
const validateLoginSchema = ajv.compile(loginSchema);
const validateCreateUserSchema = ajv.compile(createUserSchema);
const validateUpdateUserSchema = ajv.compile(updateUserSchema);
const validateCreateAdventureSchema = ajv.compile(createAdventureSchema);

export {
  ajv,
  jwtSecret,
  saltRounds,
  morganFormat,
  USERNAME_REGEX,
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  validateLoginSchema,
  validateCreateUserSchema,
  validateUpdateUserSchema,
  DEFAULT_PHONE_COUNTRY_CODE,
  validateCreateAdventureSchema,
};
