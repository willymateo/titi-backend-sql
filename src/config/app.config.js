import "dotenv/config";

const morganFormat =
  "● [:date[iso]] [:remote-addr :remote-user] :method :url HTTP/:http-version :status :response-time ms - :res[content-length]";
const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);
const USERNAME_REGEX = /^[a-z0-9_\.]*[a-z]+[a-z0-9_\.]*$/;
const jwtSecret = process.env.JWT_SECRET;
const DEFAULT_PHONE_COUNTRY_CODE = 593;
const FIRST_NAMES_MAX_LENGTH = 100;
const LAST_NAMES_MAX_LENGTH = 100;
const USERNAME_MAX_LENGTH = 30;
const USERNAME_MIN_LENGTH = 5;

export {
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
