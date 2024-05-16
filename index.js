const express = require("express");
const app = express()
const path = require("path");
const bodyParser = require('body-parser')
require('dotenv').config();
const activity = require("./routes/users.js")
const task = require("./routes/task.js");

const mongoose = require('mongoose');

require("./auth.js");
const passport = require('passport');
var cookieParser = require('cookie-parser')
var session = require('express-session');
const user = require("./models/users.js");
/*************************************************************** */

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

/****************************************************** */
const password = process.env.mongodbpassword;

const uri = "mongodb+srv://no1farziengineer:" + password + "@todolist.htsxd6x.mongodb.net/?retryWrites=true&w=majority&appName=todolist";
mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB database');
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));

/*************************************************** */
//parsering req body 
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
/******************************************** */
app.use(cookieParser())
app.use(session({
  secret: process.env.session,
  resave: false,
  saveUninitialized: true
  // cookie: { secure: false }
}));



app.use(passport.initialize());
app.use(passport.session());

app.use("/task", task);
app.use("/", activity);



app.get("/auth/google",
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get("/auth/google/callback",
  passport.authenticate('google',
    {
      failureRedirect: '/login',
    }),

  function async(req, res) {
    req.user.then((value) => {
      req.session.userId = value._id;


    }).then(() => {
      res.redirect('/home');
    })

  }

);

/**************************** */
app.listen(process.env.port || 4000, () => {
  console.log("listening to port 3000..")
})