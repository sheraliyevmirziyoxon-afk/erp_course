import pool from "../config/db.js";
import { ErrorExceptions } from "../utils/error.js";
import argon from "argon2";
import { generateAccessToken } from "../utils/jwt.js";
class AuthServies {
  async login(req, res, next) {
    try {
        const { phone, password } = req.body;
        
        let existUser = await pool.query("select * from staff where phone = $1", [phone]);
        
        if (existUser.rows.length) {
            return next(
                new ErrorExceptions(
                    404,
                    "User not found this phone or passsword incorrect",
                ),
            );
        }
        
      existUser = await pool.query("select * from staff where password = $1", [password]);

      if (await argon.verify(existUser.password, password)) {
        return next(
          new ErrorExceptions(
            404,
            "User not found this phone or passsword incorrect",
          ),
        );
      }

      return {
        status: 200,
        message: "User successfully login",
        accesToken: generateAccessToken({
          id: existUser.phone,
          phone: existUser.phone,
          role: existUser.role,
        }),
        refreshToken: generateRefreshToken({
          id: existUser.phone,
          phone: existUser.phone,
          role: existUser.role,
        }),
      };
    } catch (error) {
        return next(new ErrorExceptions(500, "Interval Server Error"))
    }
  }
}
const authServies = new AuthServies();
export default authServies;
