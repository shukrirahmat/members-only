require("dotenv").config();
const express = require("express");
const app = express();
const path = require("node:path");
const session = require("express-session");
const passport = require("passport");

// Router requires
const indexRouter = require("./routes/indexRouter");
const signUpRouter = require("./routes/signUpRouter");

// Middleware setups
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//Passport setup
require("./config/passport");
app.use(passport.session());

//Sharing user to views
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// Routes
app.use("/", indexRouter);
app.use("/sign-up", signUpRouter);

// Connecting to server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
