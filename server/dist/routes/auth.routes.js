"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const auth_controller_js_1 = require("../controllers/auth.controller.js");
const authenticate_js_1 = require("../middlewares/authenticate.js");
const authorize_js_1 = require("../middlewares/authorize.js");
// Ensure upload directory exists before storing files
const uploadDir = './uploads/avatars';
if (!fs_1.default.existsSync(uploadDir))
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
// Configure Multer storage engine
const storage = multer_1.default.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
        cb(null, `user-${req.user?.id}-${Date.now()}${path_1.default.extname(file.originalname)}`);
    }
});
const upload = (0, multer_1.default)({ storage });
const router = (0, express_1.Router)();
// Public Authentication Endpoints
router.post("/login", auth_controller_js_1.loginUser);
// Protected Admin Endpoints
router.post("/register", authenticate_js_1.authenticate, (0, authorize_js_1.authorize)("ADMIN"), auth_controller_js_1.registerUser);
// Protected Session Endpoints
router.post("/update-pin", authenticate_js_1.authenticate, auth_controller_js_1.updatePin);
router.get("/me", authenticate_js_1.authenticate, auth_controller_js_1.getMe);
// Profile Endpoints
router.patch("/profile/avatar", authenticate_js_1.authenticate, upload.single("avatar"), auth_controller_js_1.updateAvatar);
exports.default = router;
