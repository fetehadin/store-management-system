import { Router } from "express";
import { submitReturn, processReturn } from "../controllers/returns.controller";
// import your auth middlewares here

const router = Router();

router.post("/", submitReturn); // Rep submits
router.post("/:id/approve", processReturn); // Admin approves

export default router;