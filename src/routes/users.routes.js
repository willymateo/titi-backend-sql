import { verifyTokenNormal } from "../middlewares/authJwt";
import express from "express";
import {
  createUser,
  updateUser,
  getAllUsers,
  getUserByUsername,
} from "../controllers/users.controller";

const router = express.Router();

// Get all users.
router.get("/", verifyTokenNormal, getAllUsers);

// Get user by username.
router.get("/:username", verifyTokenNormal, getUserByUsername);

// Create an user.
router.post("/", createUser);

// Update user account information.
router.put("/:id_user", verifyTokenNormal, updateUser);

export default router;
