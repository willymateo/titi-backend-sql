import "dotenv/config";

const saltRounds = parseInt(process.env.JWT_SALT_ROUNDS);
const jwtSecret = process.env.JWT_SECRET;

export { saltRounds, jwtSecret };
