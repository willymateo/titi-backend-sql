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
const FIRST_NAMES_MAX_LENGTH = 100;
const LAST_NAMES_MAX_LENGTH = 100;
const USERNAME_MAX_LENGTH = 30;
const USERNAME_MIN_LENGTH = 5;

// AJV
const ajv = new Ajv();
addFormats(ajv, ["email"]);

export {
  ajv,
  jwtSecret,
  saltRounds,
  morganFormat,
  USERNAME_REGEX,
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  LAST_NAMES_MAX_LENGTH,
  FIRST_NAMES_MAX_LENGTH,
  DEFAULT_PHONE_COUNTRY_CODE,
};
