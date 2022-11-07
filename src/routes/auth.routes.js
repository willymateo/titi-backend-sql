import { validateLoginDTO } from "../middlewares/validateDTO/login";
import { login } from "../controllers/auth.controller";
import { Router } from "express";

const router = Router();

router.post("/login", validateLoginDTO, login);

export default router;
