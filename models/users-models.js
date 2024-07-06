const pool = require("../db/pool");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

exports.userLoginModel = (username, password) => {

  if (!username || !password) {
    return Promise.reject({
      status: 400,
      msg: "Bad Request",
    });
  }
  return pool
    .query(`SELECT * FROM users WHERE username = ?`, [username])
    .then(([result]) => {
      const [user] = result;
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


  return pool
    .query(`SELECT * From users WHERE username = ?`, [username])
    .then(([res]) => {
      if (res.length === 1) {
        return Promise.reject({
          status: 409,
          msg: "User Already Exists",
        });
      }
    })
    .then(() => {
      const regex = /^(?=.*\d).{8,}$/;

      if (!regex.test(password,username)) {
        return Promise.reject({
          status: 422,
          msg: "Password/Useranme Not Strong Enough",
        });  
      }
      return bcrypt.hash(password, 10);
    })
    .then((hashedPassword) => {
      return pool.query(`INSERT INTO users (username,password) VALUES (?,?)`, [
        username,
        hashedPassword,
      ]);
    })
};
