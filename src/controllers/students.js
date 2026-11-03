import studentService from "../services/students.js";

class StudentController {


  async getAllStudent(req, res, next) {
    let resData = await studentService.getAllStudents(req,res,next);
   
    return res.status(resData.status).json(resData);
    
  }
  async createStudent(req, res, next) {
    let resData = await studentService.createStudent(req, res, next);
    if(resData){
        return res.status(resData.status).json(resData);
    }
  }
}

const studentController = new StudentController();

export default studentController;