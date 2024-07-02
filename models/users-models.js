const pool = require("../db/pool")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const jwtSecret = process.env.JWT_SECRET


exports.userLoginModel = (username,password) => {
    // console.log("this is the userLoginModel ")
    return pool.query(`SELECT * FROM users WHERE username = ?`,[username])
    .then((res) => {
      const user = res[0][0]
      return bcrypt.compare(password,user.password)
      .then((validPassword) => {
        const token = jwt.sign({id : user.id},jwtSecret,{ expiresIn: "1h" })
        return token
      })
      
    })
}