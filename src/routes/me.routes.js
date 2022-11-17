import { validateUpdateUserDTO } from "../middlewares/validateUsersDTO";
import { verifyToken } from "../middlewares/authJwt";
import { Router } from "express";
import {
  getAdventures,
  getUserAccount,
  updateUserAccount,
  uploadProfilePhoto,
} from "../controllers/me.controller";

const router = Router();

// Get user account information
router.get("/account", verifyToken, getUserAccount);

// Update user account information.
router.put("/account", validateUpdateUserDTO, verifyToken, updateUserAccount);

// Upload user profile photo.
router.post("/account/photo", verifyToken, uploadProfilePhoto);

// Get all adventures of an user by token.
router.get("/adventures", verifyToken, getAdventures);

export default router;
