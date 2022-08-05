import { getAllGenres, getGenreById } from "../controllers/genres.controller";
import { Router } from "express";

const router = Router();

// Get all genres
router.get("/", getAllGenres);

// Get genre by id
router.get("/:idGenre", getGenreById);

export default router;
