require("dotenv").config();
const passport = require("passport");
const db = require("../db/queries")

const getIndexPage = (req, res) => {
  const errorMessage = req.session.messages;
  req.session.messages = undefined;
  res.render("homePage", { title: "Homepage", user: req.user, errors: errorMessage });
};

const logIn = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/",
  failureMessage: true,
});

const logOut = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

const getJoinPage = (req, res) => {
  res.render("joinPage", {title: "Become a member"});
}

const joinUser = async (req, res) => {
  if (!req.body.memberCode) {
    return res.status(400).render("joinPage", {title: "Become a member", error: "Secret code required"});
  }
  if (req.body.memberCode !== process.env.MEMBER_CODE) {
    return res.status(400).render("joinPage", {title: "Become a member", error: "Wrong secret code"});
  }
  await db.joinUser(req.user);
  res.render("joinSuccess");
}

module.exports = {
  getIndexPage,
  logIn,
  logOut,
  getJoinPage,
  joinUser
};
