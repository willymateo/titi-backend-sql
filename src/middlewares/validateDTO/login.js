import { validateLoginSchema } from "../../config/app.config";
import { validateDTO } from "./validateDTO";

const validateLoginDTO = (req, res, next) => validateDTO(req, res, next, validateLoginSchema);

export { validateLoginDTO };
