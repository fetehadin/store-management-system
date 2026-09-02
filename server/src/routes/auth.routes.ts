import { Router } from "express";
import {
  registerUser,
  loginUser,
  getMe,
  updatePin,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";

const router = Router();

// Public Authentication Endpoints
router.post("/login", loginUser);

// Protected Admin Endpoints
router.post("/register", authenticate, authorize("ADMIN"), registerUser);

// Protected Session Endpoints
router.post("/update-pin", authenticate, updatePin);
router.get("/me", authenticate, getMe);

export default router;