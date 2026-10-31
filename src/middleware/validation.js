import { ErrorExceptions } from "../utils/error.js"
import schema from  "../utils/validation.js"

export default {
    staffCreate : (req, res, next) => {
        let { error } = schema.staffSchema.validate(req.body)
        if(error){
            return next(new ErrorExceptions(400,error.message))
        }

        return next()
    }
}