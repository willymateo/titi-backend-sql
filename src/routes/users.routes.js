import { verifyToken } from "../middlewares/authJwt";
import express from "express";
import {
  createUser,
  updateUser,
  getAllUsers,
  getUserByToken,
  getUserByUsername,
  getAdventuresByUsername,
} from "../controllers/users.controller";

const router = express.Router();

// General routes
// Get all users.
router.get("/", verifyToken, getAllUsers);

// Get user by username.
router.get("/:username", verifyToken, getUserByUsername);

// Get all adventures of an user by username.
router.get("/:username/adventures", verifyToken, getAdventuresByUsername);

// Create an user.
router.post("/", createUser);

// Logged user
// Get user information
router.get("/logged/profile", verifyToken, getUserByToken);

// Update user account information.
router.put("/logged", verifyToken, updateUser);

export default router;
