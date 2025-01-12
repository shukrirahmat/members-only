const passport = require("passport");

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

module.exports = {
  getIndexPage,
  logIn,
  logOut,
  getJoinPage
};
