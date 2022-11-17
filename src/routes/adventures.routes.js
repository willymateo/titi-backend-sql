import { validateCreateAdventureDTO } from "../middlewares/validateAdventuresDTO";
import { verifyToken } from "../middlewares/authJwt";
import { Router } from "express";
import {
  createAdventure,
  getAllAdventures,
  getAdventureById,
} from "../controllers/adventures.controller";

const router = Router();

// Get all adventures.
router.get("/", verifyToken, getAllAdventures);

// Get adventure by id.
router.get("/:idAdventure", verifyToken, getAdventureById);

// Create an adventure.
router.post("/", validateCreateAdventureDTO, verifyToken, createAdventure);

export default router;
