const express = require("express");
const app = express();
const user = require("../models/users")
const userController = require("../controller/users");
const { islogin } = require("../middleware");

app.route("/home")
   .post(userController.login)
   .get(islogin, userController.home)


app.route("/register")
   .get(userController.register)
   .post(userController.creatingUser)

app.route("/login")
   .get(userController.loginpage)


app.route("/logout")
   .get(islogin, userController.logout)

module.exports = app