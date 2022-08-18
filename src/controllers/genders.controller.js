import { Genders } from "../db/models/genders";

const getAllGenders = async (req, res) => {
  try {
    const allGenders = await Genders.findAll({
      attributes: ["id", "gender"],
    });

    if (!allGenders) {
      return res.status(404).send({
        error: "Genders not found",
      });
    }
    return res.status(200).send(allGenders);
  } catch (err) {
    console.log(err);
    return res.status(409).send({
      error: `Some error occurred: ${err}`,
    });
  }
};

const getGenderById = async (req, res) => {
  const { idGender } = req.params;

  try {
    const gender = await Genders.findOne({
      where: { id: idGender },
      attributes: ["id", "gender"],
    });

    if (!gender) {
      return res.status(404).send({
        error: `Gender with id=${idGender} not found`,
      });
    }
    return res.status(200).send(gender);
  } catch (err) {
    console.log(err);
    return res.status(409).send({
      error: `Some error occurred: ${err}`,
    });
  }
};

export { getAllGenders, getGenderById };
