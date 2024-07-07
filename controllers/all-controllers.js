const {
    userLoginController,
    userRegisterController,
  } = require("./users-controllers");







  const  controllers = {
    userLogin : userLoginController,
    userRegister : userRegisterController
} 

module.exports = controllers