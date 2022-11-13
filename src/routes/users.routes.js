import { validateCreateUserDTO } from "../middlewares/validateDTO/users";
import { verifyToken } from "../middlewares/authJwt";
import express from "express";
import {
  createUser,
  getAllUsers,
  getUserByUsername,
  getAdventuresByUsername,
} from "../controllers/users.controller";

const router = express.Router();

// Get all users.
router.get("/", verifyToken, getAllUsers);

// Get user by username.
router.get("/:username", verifyToken, getUserByUsername);

// Get all adventures of an user by username.
router.get("/:username/adventures", verifyToken, getAdventuresByUsername);

// Create an user.
router.post("/", validateCreateUserDTO, createUser);

export default router;
