import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  registerUser,
  loginUser,
  getMe,
  updatePin,
  updateAvatar, // Make sure this is exported from your controller
} from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";

// Ensure upload directory exists before storing files
const uploadDir = './uploads/avatars';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Configure Multer storage engine
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, `user-${req.user?.id}-${Date.now()}${path.extname(file.originalname)}`);
  }
});
const upload = multer({ storage });

const router = Router();

// Public Authentication Endpoints
router.post("/login", loginUser);

// Protected Admin Endpoints
router.post("/register", authenticate, authorize("ADMIN"), registerUser);

// Protected Session Endpoints
router.post("/update-pin", authenticate, updatePin);
router.get("/me", authenticate, getMe);

// Profile Endpoints
router.patch("/profile/avatar", authenticate, upload.single("avatar"), updateAvatar);

export default router;