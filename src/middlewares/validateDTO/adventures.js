import { validateLoginSchema } from "../../config/app.config";

const validateLoginDTO = (req, res, next) => {
  const isValid = validateLoginSchema(req.body);

  if (!isValid) {
    return res.status(400).send({
      error: "Invalid body schema",
    });
  }

  next();
};

export { validateLoginDTO };
