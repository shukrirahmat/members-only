const {Router} = require("express");
const router = Router();
const indexController = require("../controllers/indexController");

router.get("/", indexController.getIndexPage);
router.post("/log-in", indexController.logIn);
router.get("/log-out", indexController.logOut);

module.exports = router;

