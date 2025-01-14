const db = require("../db/queries");

const getMessageForm = (req, res) => {
  res.render("messageForm", { title: "Add New Message" });
};

const addNewMessage = async (req, res) => {
    if (!req.body.message) {
        return res.status(400).render("messageForm", {title: "Add New Message", error: "Message is empty"});
    }
    await db.addNewMessage(req.body.message, req.user);
    res.redirect("/");
};

module.exports = {
  getMessageForm,
  addNewMessage
};
