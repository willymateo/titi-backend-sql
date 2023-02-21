import { createAdventureSchema } from "../ajv/adventures";
import { createUserSchema } from "../ajv/users";
import { updateUserSchema } from "../ajv/me";
import { loginSchema } from "../ajv/login";
import addFormats from "ajv-formats";
import "dotenv/config";
import Ajv from "ajv";

// Server
const nodeEnvironment = process.env.NODE_ENV || "development";
const port = process.env.PORT || 0;

// morgan
const morganFormat =
  "● [:date[iso]] [:remote-addr :remote-user] :method :url HTTP/:http-version :status :response-time ms - :res[content-length]\n";

// bcrypt
const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);

// JWT
const jwtSecret = process.env.JWT_SECRET;

// user model
const USERNAME_REGEX = "^[a-z0-9_.]*[a-z]+[a-z0-9_.]*$";
const USERNAME_MAX_LENGTH = 30;
const USERNAME_MIN_LENGTH = 5;

// AJV
const ajv = new Ajv();
addFormats(ajv, ["email", "url", "date-time", "date"]);
const validateCreateAdventureSchema = ajv.compile(createAdventureSchema);
const validateCreateUserSchema = ajv.compile(createUserSchema);
const validateUpdateUserSchema = ajv.compile(updateUserSchema);
const validateLoginSchema = ajv.compile(loginSchema);

export {
  validateCreateAdventureSchema,
  validateUpdateUserSchema,
  validateCreateUserSchema,
  validateLoginSchema,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  nodeEnvironment,
  USERNAME_REGEX,
  morganFormat,
  saltRounds,
  jwtSecret,
  port,
  ajv,
};
