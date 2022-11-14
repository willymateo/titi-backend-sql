import { validateCreateUserSchema, validateUpdateUserSchema } from "../config/app.config";
import { validateDTO } from "./validateDTO";

const validateCreateUserDTO = (req, res, next) =>
  validateDTO(req, res, next, validateCreateUserSchema);

const validateUpdateUserDTO = (req, res, next) =>
  validateDTO(req, res, next, validateUpdateUserSchema);

export { validateCreateUserDTO, validateUpdateUserDTO };
