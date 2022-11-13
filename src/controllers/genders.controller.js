import { Genders } from "../db/models/genders";

const getAllGenders = async (req, res) => {
  try {
    const allGenders = await Genders.findAll({
      attributes: ["id", "gender"],
    });
    return res.status(200).send(allGenders);
  } catch (err) {
    console.log(err);
    return res.status(409).send({
      error: `Some error occurred: ${err}`,
    });
  }
};

const getGenderById = async (req, res) => {
  try {
    const { idGender } = req.params;
    const gender = await Genders.findByPk(idGender, {
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
