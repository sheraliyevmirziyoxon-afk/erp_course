import teacherService from "../services/teachers.js";

class TeacherController {
  async createTeacher(req, res, next) {
    let resData = await teacherService.createTeacher(req, res, next);

    return res.status(resData.status).json(resData);
  }
}

const teacherController = new TeacherController();

export default teacherController;