import staffRouter from "./staffs.js"
import authRouter from "./auth.js"
import teacherRouter from "./teacher.js"
import studentRouter from "./students.js"
import { Router } from "express"

const main = Router()

main.use("/api/v1", staffRouter)
    .use("/api/v1", authRouter)
    .use("/api/v1", teacherRouter)
    .use("/api/v1", studentRouter)
    

export default main



