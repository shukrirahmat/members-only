const {Router} = require("express");
const router = Router();
const newMessageController = require("../controllers/newMessageController");

router.get("/", newMessageController.getMessageForm);
router.post("/", newMessageController.addNewMessage);

module.exports = router;