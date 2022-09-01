import { verifyToken } from "../middlewares/authJwt";
import express from "express";
import {
  createAdventure,
  getAllAdventures,
  getAdventureById,
} from "../controllers/adventures.controller";

const router = express.Router();

// Get all adventures.
router.get("/", getAllAdventures);

// Get adventure by id.
router.get("/:idAdventure", getAdventureById);

// Create an adventure.
router.post("/", verifyToken, createAdventure);

export default router;
