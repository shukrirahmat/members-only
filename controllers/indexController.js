require("dotenv").config();
const passport = require("passport");
const db = require("../db/queries");

const getIndexPage = async (req, res) => {
  const errorMessage = req.session.messages;
  req.session.messages = undefined;

  const messagesRows = await db.getAllMessages();

  res.render("homePage", {
    title: "Homepage",
    user: req.user,
    messages: messagesRows,
    errors: errorMessage,
  });
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
  if (req.user.membership_status) {
    return res.redirect("/");
  }
  res.render("joinPage", { title: "Become a member" });
};

const joinUser = async (req, res) => {
  if (!req.body.memberCode) {
    return res
      .status(400)
      .render("joinPage", {
        title: "Become a member",
        error: "Secret code required",
      });
  }
  if (req.body.memberCode !== (process.env.MEMBER_CODE && process.env.ADMIN_CODE)) {
    return res
      .status(400)
      .render("joinPage", {
        title: "Become a member",
        error: "Wrong secret code",
      });
  }
  const isAdmin = req.body.memberCode === process.env.ADMIN_CODE;

  await db.joinUser(req.user, isAdmin);
  res.render("joinSuccess", {isAdmin});
};

const deleteMessage = async (req, res) => {
  const deleteId = req.query.deleteId;
  await db.deleteMessage(deleteId);
  res.redirect("/");
}

module.exports = {
  getIndexPage,
  logIn,
  logOut,
  getJoinPage,
  joinUser,
  deleteMessage
};
