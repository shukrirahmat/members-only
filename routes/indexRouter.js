const {Router} = require("express");
const router = Router();
const indexController = require("../controllers/indexController");

router.get("/", indexController.getIndexPage);
router.post("/log-in", indexController.logIn);
router.get("/log-out", indexController.logOut);
router.get("/join", indexController.getJoinPage);
router.post("/join", indexController.joinUser);
router.get("/upgrade", indexController.getUpgradePage);
router.post("/upgrade", indexController.upgradeToAdmin);
router.post("/delmessage", indexController.deleteMessage);

module.exports = router;

