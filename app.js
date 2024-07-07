const express = require("express");
const app = express();
const {
  userLoginController,
  userRegisterController,
} = require("./controllers/users-controllers");
const controllers = require("./controllers/all-controllers")

app.use(express.json());

app.post("/login", controllers.userLogin);
app.post("/register", controllers.userRegister);

app.use((err, req, res, next) => {

  if (err.status && err.msg) {
    res.status(err.status).send({ error: err.msg });
  } else next(err);
});




app.use((err, req, res, next) => {
  switch (err.sqlState) {
    case "23000":
      res.status(400).send({ msg: "Bad Request" });
      break;
  }
});



module.exports = app;
