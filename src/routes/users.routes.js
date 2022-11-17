import { validateCreateUserDTO } from "../middlewares/validateUsersDTO";
import { createToken, verifyToken } from "../middlewares/authJwt";
import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUserByUsername,
  getAdventuresByUsername,
} from "../controllers/users.controller";

const router = Router();

// Get all users.
router.get("/", verifyToken, getAllUsers);

// Get user by username.
router.get("/:username", verifyToken, getUserByUsername);

// Get all adventures of an user by username.
router.get("/:username/adventures", verifyToken, getAdventuresByUsername);

// Create an user.
router.post("/", validateCreateUserDTO, createUser, createToken);

export default router;
