import { validateUpdateUserDTO } from "../middlewares/validateDTO/users";
import { verifyToken } from "../middlewares/authJwt";
import express from "express";
import {
  getAdventures,
  getUserAccount,
  updateUserAccount,
  uploadProfilePhoto,
} from "../controllers/me.controller";

const router = express.Router();

// Get user account information
router.get("/account", verifyToken, getUserAccount);

// Update user account information.
router.put("/account", validateUpdateUserDTO, verifyToken, updateUserAccount);

// Upload user profile photo.
router.post("/account/photo", verifyToken, uploadProfilePhoto);

// Get all adventures of an user by token.
router.get("/adventures", verifyToken, getAdventures);

export default router;
