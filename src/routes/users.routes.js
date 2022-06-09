import { verifyToken } from "../middlewares/authJwt";
import express from "express";
import {
  createUser,
  updateUser,
  getAllUsers,
  getUserByUsername,
} from "../controllers/users.controller";

const router = express.Router();

// Get all users.
router.get("/", verifyToken, getAllUsers);

// Get user by username.
router.get("/:username", verifyToken, getUserByUsername);

// Create an user.
router.post("/", createUser);

// Update user account information.
router.put("/:idUser", verifyToken, updateUser);

export default router;
