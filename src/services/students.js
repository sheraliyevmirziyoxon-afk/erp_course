import pool from "../config/db.js";
import argon from "argon2";
import { ErrorExceptions } from "../utils/error.js";

class StudentService {
  async getAllStudents(){
        let students = await pool.query("select id, fullname, phone, photo, status, created_at from students")
        return {
            status:200,
            message:students.rows
        }
    }  
  async createStudent(req, res, next) {
    try {
      const { fullname, phone, password } = req.body;

      let hashPass = await argon.hash(password);
      await pool.query(
        `insert into students(fullname, phone, password) values($1, $2, $3)`,
        [fullname, phone, hashPass]
      );

      return {
        status: 201,
        message: "Student added!"
      };
    } catch (error) {
      return next(new ErrorExceptions(500, error));
    }
  }
}

const studentService = new StudentService();

export default studentService;