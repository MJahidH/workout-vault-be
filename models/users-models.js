const pool = require("../db/pool");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

exports.userLoginModel = (username, password) => {
  // console.log("this is the userLoginModel ")
  if (!username || !password) {
    return Promise.reject({
      status: 400,
      msg: "Bad Request",
    });
  }
  return pool
    .query(`SELECT * FROM users WHERE username = ?`, [username])
    .then((res) => {
      const user = res[0][0];
      if (!user) {
        return Promise.reject({
          status: 404,
          msg: "Username Not Found",
        });
      } else {
        return bcrypt.compare(password, user.password).then((validPassword) => {
          if (!validPassword) {
            return Promise.reject({
              status: 401,
              msg: "Incorrect Password",
            });
          }

          const token = jwt.sign({ id: user.id }, jwtSecret, {
            expiresIn: "1h",
          });
          return token;
        });
      }
    });
};

exports.userRegisterModel = (username, password) => {
  return bcrypt.hash(password, 10).then((hashedPassword) => {
    return pool.query(`INSERT INTO users (username,password) VALUES (?,?)`, [
      username,
      hashedPassword,
    ]);
  });
};
