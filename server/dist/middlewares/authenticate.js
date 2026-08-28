"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jwt_js_1 = require("../utils/jwt.js");
const errors_js_1 = require("../utils/errors.js");
const db_js_1 = require("../config/db.js");
const authenticate = async (req, _res, next) => {
    try {
        const authHeader = req.headers.authorization;
        // Step 1: Enforce Authorization header presence and standard "Bearer <token>" format
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new errors_js_1.UnauthorizedError("Missing or invalid Authorization header");
        }
        // Step 2: Extract token and cryptographically verify signature
        const token = authHeader.split(" ")[1];
        const decoded = (0, jwt_js_1.verifyToken)(token);
        // Step 3: Database Liveness Check (prevents deleted/terminated employees from accessing APIs)
        const user = await db_js_1.db.user.findUnique({
            where: { id: decoded.userId },
        });
        if (!user) {
            throw new errors_js_1.UnauthorizedError("The user account belonging to this token no longer exists");
        }
        // Step 4: Attach verified user to the request for downstream controllers
        req.user = user;
        next();
    }
    catch (err) {
        next(err); // Passes errors cleanly to our global errorHandler middleware from Step 4
    }
};
exports.authenticate = authenticate;
