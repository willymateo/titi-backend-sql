const validateDTO = (req, res, next, validate) => {
  const isValid = validate(req.body);

  if (!isValid) {
    console.log("Some error ocurred validating body schema");
    console.log(validate.errors);
    return res.status(400).send({
      error: "Invalid body schema",
    });
  }

  next();
};

export { validateDTO };
