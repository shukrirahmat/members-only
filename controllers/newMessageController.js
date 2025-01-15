const db = require("../db/queries");
const asyncHandler = require("express-async-handler");

const getMessageForm = (req, res) => {
  res.render("messageForm", { title: "Add New Message" });
};

const addNewMessage = asyncHandler(async (req, res) => {
    if (!req.body.message) {
        return res.status(400).render("messageForm", {title: "Add New Message", error: "Message is empty"});
    }
    await db.addNewMessage(req.body.message, req.user);
    res.redirect("/");
});

module.exports = {
  getMessageForm,
  addNewMessage
};
