import { validateCreateUserSchema, validateUpdateUserSchema } from "../../config/app.config";

const validateCreateUserDTO = (req, res, next) => {
  const isValid = validateCreateUserSchema(req.body);

  if (!isValid) {
    return res.status(400).send({
      error: "Invalid body schema",
    });
  }

  next();
};

const validateUpdateUserDTO = (req, res, next) => {
  const isValid = validateUpdateUserSchema(req.body);

  if (!isValid) {
    return res.status(400).send({
      error: "Invalid body schema",
    });
  }

  next();
};

export { validateCreateUserDTO, validateUpdateUserDTO };
