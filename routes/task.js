const express = require("express");
const app = express();
const { islogin } = require("../middleware");
const task = require("../controller/task")


app.route("/add")
    .post(islogin, task.add)

app.route("/remove")
    .post(islogin, task.remove)

app.route("/update")
    .post(islogin, task.update)

module.exports = app;
