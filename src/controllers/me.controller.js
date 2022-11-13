import { adventureToJson, userToJson } from "./json/users.converter";
import { Genders } from "../db/models/genders";
import { Users } from "../db/models/users";

const getUserAccount = async (req, res) => {
  try {
    const { id } = req.decodedToken;

    const user = await Users.findByPk(id, {
      attributes: { exclude: ["idRole", "passwordHash", "createdAt", "updatedAt", "deletedAt"] },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const userJSON = await userToJson(user);

    if (userJSON.error) {
      throw userJSON.error;
    }

    return res.status(200).send(userJSON);
  } catch (error) {
    console.log(error);
    return res.status(409).send({ error: `${error.name} - ${error.message}` });
  }
};

const updateUserAccount = async (req, res) => {
  try {
    const { password, idGender, ...payload } = req.body;
    const { id } = req.decodedToken;

    const user = await Users.findByPk(id, {});

    // Not found user.
    if (!user) {
      throw new Error("User not found");
    }

    user.set(payload);

    if (password) {
      const passwordHash = await Users.encryptPassword(password);
      user.set({ passwordHash });
    }

    if (idGender) {
      const gender = await Genders.findByPk(idGender);
      if (gender) {
        user.idGender = gender.id;
      } else {
        return res.status(400).send({
          error: "Invalid idGender",
        });
      }
    }

    await user.validate();
    await user.save();
    return res.status(200).send({
      message: "User updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(409).send({ error: `${error.name} - ${error.message}` });
  }
};

const getAdventures = async (req, res) => {
  try {
    const { id } = req.decodedToken;

    const user = await Users.findByPk(id, {
      attributes: ["id"],
    });

    if (!user) {
      throw new Error("User not found");
    }

    let adventures = await user.getAdventures({
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
      },
    });

    adventures = await Promise.all(
      adventures.map(async adventure => {
        const adventureJSON = await adventureToJson(adventure);

        if (adventureJSON.error) {
          throw adventureJSON.error;
        }

        return adventureJSON;
      })
    );

    return res.status(200).send(adventures);
  } catch (error) {
    console.log(error);
    return res.status(409).send({ error: `${error.name} - ${error.message}` });
  }
};

const uploadProfilePhoto = async (req, res) => {
  try {
    const { id } = req.decodedToken;

    const user = await Users.findByPk(id, {
      attributes: ["id", "photoUrl"],
    });

    if (!user) {
      throw new Error("User not found");
    }

    console.log(req.files);

    return res.status(200).send({
      message: "Photo uploaded successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(409).send({ error: `${error.name} - ${error.message}` });
  }
};

export { getAdventures, getUserAccount, updateUserAccount, uploadProfilePhoto };
