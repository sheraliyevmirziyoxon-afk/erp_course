import staffServis from "../services/staff.js"

class StaffController {
    constructor(){}

 
    async getAllStaff(req, res){
        let resData = await staffServis.getStaffs()
        return res.status(resData.status).json(resData)

    }

    async createStaff(req,res){
        let resData = await staffServis.createStaff(req)
        return res.status(resData.status).json(resData)
    }

    async deleteStaff(req, res){
        let resData = await staffServis.deleteStaff(req)
        return res.status(resData.status).json(resData)

    }
}

const staffController = new StaffController()
export default staffController