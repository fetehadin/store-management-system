import { Router } from "express";
import { registerUser, loginUser, getMe } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

// Public Authentication Endpoints
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected Session Endpoints
router.get("/me", authenticate, getMe);

export default router;