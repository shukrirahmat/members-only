require("dotenv").config();
const express = require("express");
const app = express();
const path = require("node:path");
const session = require("express-session");
const passport = require("passport");
const pgSession = require("connect-pg-simple")(session);
const pool = require("./db/pool");

// Router requires
const indexRouter = require("./routes/indexRouter");
const signUpRouter = require("./routes/signUpRouter");
const newMessageRouter = require("./routes/newMessageRouter");

// Session setups
const sessionStore = new pgSession({
  pool,
  createTableIfMissing: true
})
app.use(
  session({
    store: sessionStore,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
  })
);

// Middleware setups
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
app.use("/newmessage", newMessageRouter);

//Error Handling
const PageNotFoundError = require("./errors/pageNotFoundError");
app.use((req, res, next) => {
  throw new PageNotFoundError("The requested page could not be found");
});
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).render("errorPage", {title: "Error", error: err.message, code : err.statusCode || 500});
});

// Connecting to server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
