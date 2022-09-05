import { verifyToken } from "../middlewares/authJwt";
import express from "express";
import {
  createUser,
  updateUser,
  getAllUsers,
  getUserByToken,
  getUserByUsername,
  uploadProfilePhoto,
  getAdventuresByToken,
  getAdventuresByUsername,
} from "../controllers/users.controller";

const router = express.Router();

// Logged user
// Get user information
router.get("/logged", verifyToken, getUserByToken);

// Update user account information.
router.put("/logged", verifyToken, updateUser);

// Upload user profile photo.
router.post("/logged/profile/photo", verifyToken, uploadProfilePhoto);

// Get all adventures of an user by token.
router.get("/logged/adventures", verifyToken, getAdventuresByToken);

// General routes
// Get all users.
router.get("/", verifyToken, getAllUsers);

// Get user by username.
router.get("/:username", verifyToken, getUserByUsername);

// Get all adventures of an user by username.
router.get("/:username/adventures", verifyToken, getAdventuresByUsername);

// Create an user.
router.post("/", createUser);

export default router;
