import express from "express"
import staffController from "../controllers/staff.js"
import validationMiddleware from "../middleware/validation.js"
const router = express.Router() 


router
    .get("/staff", staffController.getAllStaff)
    .post("/staff",validationMiddleware.staffCreate, staffController.createStaff)
    .delete("/staff/:userId", staffController.deleteStaff)



export default router