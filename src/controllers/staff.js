import staffServis from "../services/staff.js"

class StaffController {
    constructor(){}

 
    async getAllStaff(req, res){
        let resData = await staffServis.getStaffs()
        return res.status(resData.status).json(resData)

    }

    async createStaff(req,res,next){
        let resData = await staffServis.createStaff(req,res,next)
        if(resData){
            return res.status(resData.status).json(resData)
        }
    }

    async deleteStaff(req, res, next){
        let resData = await staffServis.deleteStaff(req,res,next)
        // return res.status(resData.status).json(resData)

        if(resData){
            return res.status(resData.status).json(resData)
        }

    }
}

const staffController = new StaffController()
export default staffController