import { Router } from "express";
import {
  registerUser,
  loginUser,
  getMe,
  updatePin,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

// Public Authentication Endpoints
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected Session Endpoints
router.post("/update-pin", authenticate, updatePin);
router.get("/me", authenticate, getMe);

export default router;
