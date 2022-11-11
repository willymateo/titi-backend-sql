import { validateCreateAdventureSchema } from "../../config/app.config";

const validateCreateAdventureDTO = (req, res, next) => {
  const isValid = validateCreateAdventureSchema(req.body);

  if (!isValid) {
    console.log(validateCreateAdventureSchema.errors);
    return res.status(400).send({
      error: "Invalid body schema",
    });
  }

  next();
};

export { validateCreateAdventureDTO };
