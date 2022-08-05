import { Genres } from "../db/models/genres";

const getAllGenres = async (req, res) => {
  try {
    const allGenres = await Genres.findAll({
      attributes: ["id", "genre"],
    });

    if (!allGenres) {
      return res.status(404).send({
        error: "Genres not found",
      });
    }
    return res.status(200).send(allGenres);
  } catch (err) {
    console.log(err);
    return res.status(409).send({
      error: `Some error occurred: ${err}`,
    });
  }
};

const getGenreById = async (req, res) => {
  const { idGenre } = req.params;

  try {
    const genre = await Genres.findOne({
      where: { id: idGenre },
      attributes: ["id", "genre"],
    });

    if (!genre) {
      return res.status(404).send({
        error: `Genre with id=${idGenre} not found`,
      });
    }
    return res.status(200).send(genre);
  } catch (err) {
    console.log(err);
    return res.status(409).send({
      error: `Some error occurred: ${err}`,
    });
  }
};

export { getAllGenres, getGenreById };
