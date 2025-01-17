require("dotenv").config();
const passport = require("passport");
const db = require("../db/queries");
const asyncHandler = require("express-async-handler");

const getIndexPage = asyncHandler(async (req, res) => {
  const errorMessage = req.session.messages;
  req.session.messages = undefined;

  const messagesRows = await db.getAllMessages();

  res.render("homePage", {
    title: "Homepage",
    user: req.user,
    messages: messagesRows,
    errors: errorMessage,
  });
});

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
  if (!req.user) {
    return res.redirect("/");
  }
  if (req.user.membership_status) {
    return res.redirect("/");
  }
  res.render("joinPage", { title: "Become a member" });
};

const joinUser = asyncHandler(async (req, res) => {
  if (!req.body.memberCode) {
    return res
      .status(400)
      .render("joinPage", {
        title: "Become a member",
        error: "Secret code required",
      });
  }
  if (req.body.memberCode !== process.env.MEMBER_CODE) {
    return res
      .status(400)
      .render("joinPage", {
        title: "Become a member",
        error: "Wrong secret code",
      });
  }
  await db.joinUser(req.user);
  res.render("joinSuccess");
});

const deleteMessage = asyncHandler(async (req, res) => {
  const deleteId = req.body.deleteId;
  await db.deleteMessage(deleteId);
  res.redirect("/");
});

const getUpgradePage = (req, res) => {
  if (!req.user) {
    return res.redirect("/");
  }

  if (req.user.admin_status) {
    return res.redirect("/");
  }
  res.render("upgradePage", { title: "Become an Admin" });
}

const upgradeToAdmin = asyncHandler(async (req, res) => {
  if (!req.body.adminCode) {
    return res
      .status(400)
      .render("upgradePage", {
        title: "Become an Admin",
        error: "Admin code required",
      });
  }
  if (req.body.adminCode !== process.env.ADMIN_CODE) {
    return res
      .status(400)
      .render("upgradePage", {
        title: "Become an Admin",
        error: "Wrong Admin code",
      });
  }
  await db.upgradeToAdmin(req.user);
  res.render("upgradeSuccess");
});

module.exports = {
  getIndexPage,
  logIn,
  logOut,
  getJoinPage,
  joinUser,
  deleteMessage,
  getUpgradePage,
  upgradeToAdmin
};
