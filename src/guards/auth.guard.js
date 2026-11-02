import { ErrorExceptions } from "../utils/error.js";
import { verifyToken } from "../utils/jwt.js"


export const authGuard = async (req, res, next) => {
    try {
        let { token } = req.headers
        if(!token){
            return next(new ErrorExceptions(401, "Unauthorized"))
        }

        let user = verifyToken(token)
        req.user = user
        return next()

    } catch (error) {
        if(error.name == "JsonWebTokenError"){
            return next(new ErrorExceptions(401, error.message))
        }
        if(error.name == "TokenExpiredError"){
            return next(new ErrorExceptions(401, error.message))
        }
        return next(new ErrorExceptions(500, "Internal Server Error"))
    }
}