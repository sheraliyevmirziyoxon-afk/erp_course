import authServies from "../services/auth.js"

class AuthController{
    async login(req,res,next){
        let resData = await authServies.login(req, res, next)
        if(resData){
            return res.status(resData.status).json(resData)
        }
    }
}

const authController = new AuthController()
export default authController