const express = require("express");
const app = express();
const path = require("node:path");

// Router requires
const indexRouter = require("./routes/indexRouter");
const signUpRouter = require("./routes/signUpRouter");


// Middleware setups
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", indexRouter);
app.use("/sign-up", signUpRouter);

// Connecting to server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
})
