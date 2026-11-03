import express from "express"
import studentController from "../controllers/students.js"
import middleware from "../middleware/validation.js"
import { roleGuard } from "../guards/role.guard.js"
import { authGuard } from "../guards/auth.guard.js"
const router = express.Router() 


router
    .get("/students",authGuard,roleGuard("admin"),studentController.getAllStudent)
    .post("/students",middleware.createStudent,studentController.createStudent)


export default router