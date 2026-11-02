import pool from "../config/db.js";
import argon2 from "argon2";
import { ErrorExceptions } from "../utils/error.js";

class StaffServis {
  constructor() {}

  async createStaff(req, res, next) {
    try {
      const { fullname, phone, password, role } = req.body;

      let existStaff = await pool.query("select * from staff where phone=$1", [
        phone,
      ]);

      if (existStaff.rows.length) {
        return next(new ErrorExceptions(409, "User already exist"));
      }

      const hashPassword = await argon2.hash(password);

      await pool.query(
        ` insert into staff(fullname, phone, password, role) values ($1, $2, $3, $4) `,
        [fullname, phone, hashPassword, role],
      );

      return {
        status: 201,
        message: "user succesfully created",
      };
    } catch (error) {
      return res.status(new ErrorExceptions(500, "Internal Server Error"));
    }
  }

  async getStaffs(req, res, next) {
    try {
      let staffs = await pool.query(
        "select id, fullname, phone, role, status, created_at from staff",
      );
      return {
        status: 200,
        data: staffs.rows,
      };
    } catch (error) {
      return res.status(new ErrorExceptions(500, "Internal Server Error"));
    }
  }

  async deleteStaff(req, res, next) {
    try {
      let { userId } = req.params;

      let existStaff = await pool.query("select * from staff where id=$1", [
        userId,
      ]);

      if (!existStaff.rows.length) {
        return next(new ErrorExceptions(404, "user not found with this id"));
      }

      await pool.query("update staff set status='inactive' where id=$1", [
        userId,
      ]);
      return {
        status: 200,
        message: "user deleted!",
      };
    } catch (error) {
        return res.status(new ErrorExceptions(500, "Internal Server Error"));
    }
  }
}

let staffServis = new StaffServis();
export default staffServis;
