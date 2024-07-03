const { userLoginModel, userRegisterModel } = require("../models/users-models");

exports.userLoginController = (req, res, next) => {
  const { username, password } = req.body;
  userLoginModel(username, password)
    .then((token) => {
      res.status(200).send({ token: token, text: "User Login Successful" });
    })
    .catch(next);
};

exports.userRegisterController = (req, res, next) => {
  const { username, password } = req.body;

  userRegisterModel(username, password).then(() => {
    res.status(200).send( "Registration Successful");
  });
};
