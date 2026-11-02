import express from "express";
import teacherController from "../controllers/teachers.js";
import validationMiddleware from "../middleware/validation.js";
import { authGuard } from "../guards/auth.guard.js";

const router = express.Router();

router.post("/teachers", teacherController.createTeacher);

export default router;