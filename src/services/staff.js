
import pool from "../config/db.js"
import argon2 from "argon2"


class StaffServis{
    constructor(){}

    async createStaff(req){
        
        const { fullname, phone, password, role } = req.body

        let existStaff = await pool.query("select * from staff where phone=$1", [phone])

        if(existStaff.rows.length){
            return {
                status:409,
                message:"user already axist with phone"
            }
        }

        const hashPassword = await argon2.hash(password)

        await pool.query(` insert into staff(fullname, phone, password, role) values ($1, $2, $3, $4) `, [fullname, phone, hashPassword, role])

        return {
            status:201,
            message:"user succesfully created"
        }

    }

    async getStaffs(){
        let staffs = await pool.query("select id, fullname, phone, role, status, created_at from staff")
        // id fullname phone role status created_at 
        return {
            status:200,
            data: staffs.rows
        }
    }

    async deleteStaff(req){
        let { userId } = req.params

        let existStaff = await pool.query("select * from staff where id=$1", [userId])

        if(!existStaff.rows.length){
            return {
                status:404,
                message:" user not found with this id"
            }
        }  

        await pool.query("update staff set status='inactive' where id=$1", [userId])
        return {
            status:200,
            message:"user deleted!"
        }
    }

}

let staffServis = new StaffServis()
export default staffServis