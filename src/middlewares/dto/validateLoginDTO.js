import Ajv from "ajv";

const schema = {
  type: "object",
  properties: {
    username: {
      type: "string",
    },
    password: {
      type: "string",
    },
    required: ["username", "password"],
    additionalProperties: false,
  },
};

const ajv = new Ajv();
const validate = ajv.compile(schema);

const validateLoginDTO = (req, res, next) => {
  const isValid = validate(req.body);

  if (!isValid) {
    return res.status(400).send({
      error: "Invalid body schema",
    });
  }

  next();
};

export { validateLoginDTO };
