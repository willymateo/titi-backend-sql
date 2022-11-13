import { validateCreateAdventureSchema } from "../config/app.config";
import { validateDTO } from "./validateDTO";

const validateCreateAdventureDTO = (req, res, next) =>
  validateDTO(req, res, next, validateCreateAdventureSchema);

export { validateCreateAdventureDTO };
