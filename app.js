const express = require("express");
const app = express();
const {
  userLoginController,
  userRegisterController,
} = require("./controllers/users-controllers");

app.use(express.json());

app.post("/login", userLoginController);
app.post("/register", userRegisterController);

app.use((err, req, res, next) => {

  if (err.status && err.msg) {
    res.status(err.status).send({ error: err.msg });
  } else next(err);
});




app.use((err, req, res, next) => {
  if (err.sqlState === "23000") {
    res.status(400).send({ msg: "Bad Request" });
  }
});



module.exports = app;
