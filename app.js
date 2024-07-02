const express = require("express");
const app = express();
const {userLoginController} = require("./controllers/users-controllers")

app.use(express.json());

app.post("/login",userLoginController)

module.exports = app;
