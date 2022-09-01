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

// Get all users.
router.get("/", verifyToken, getAllUsers);

// Get user by username.
router.get("/:username", verifyToken, getUserByUsername);

// Get user by token.
router.get("/login/profile", verifyToken, getUserByToken);

// Get all adventures of an user by username.
router.get("/:username/adventures", verifyToken, getAdventuresByUsername);

// Create an user.
router.post("/", createUser);

// Update user account information.
router.put("/:idUser", verifyToken, updateUser);

export default router;
