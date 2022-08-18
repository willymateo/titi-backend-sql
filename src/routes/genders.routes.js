import { getAllGenders, getGenderById } from "../controllers/genders.controller";
import { Router } from "express";

const router = Router();

// Get all genders
router.get("/", getAllGenders);

// Get gender by id
router.get("/:idGender", getGenderById);

export default router;
