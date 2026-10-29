import staffRouter from "./staffs.js"
import { Router } from "express"

const main = Router()

main.use("/api/v1", staffRouter)

export default main