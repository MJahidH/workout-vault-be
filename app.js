const express = require("express");
const app = express();
const { userLoginController } = require("./controllers/users-controllers");

app.use(express.json());

app.post("/login", userLoginController);








app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ error: err.msg });
  } else next(err)
});

module.exports = app;
