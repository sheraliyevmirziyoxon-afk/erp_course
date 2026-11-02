import express from "express"
import main from "./routers/index.js"
import { configDotenv } from "dotenv"
import fs from "fs"
import path from "path"

configDotenv()

const app = express()

app.use(express.json())
app.use(main)

app.use((error,req,res,next) => {
    if(error.status < 500){

        return res.status(error.status).json({
            status:error.status,
            message:error.message
        })
    }else{

        fs.appendFileSync(path.join(process.cwd(), "src", "log", "logger.txt"),
        `[${new Date().toLocaleString()}]--${req.method}--${req.url}--${error.message}\n`
        )

        return res.status(error.status).json({
            status:error.status,
            message:"Internal Server Error"
        })
    }
})

app.listen(process.env.PORT, () => console.log("server is running..."))