import "dotenv/config";

const morganFormat =
  "[:date[iso]] [:remote-addr :remote-user] :method :url HTTP/:http-version :status :response-time ms - :res[content-length]";
const saltRounds = parseInt(process.env.JWT_SALT_ROUNDS);
const jwtSecret = process.env.JWT_SECRET;

export { saltRounds, jwtSecret, morganFormat };
