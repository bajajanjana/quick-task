const {
	registerUser,
	login,
	logout,
	findOne,
} = require("../controller/user.controller");
const { protect } = require("../middlewere/auth");

const router = require("express").Router();

router.post("/", registerUser);
router.post("/login", login);
router.get("/", protect, findOne);
router.post("/logout", protect, logout);

module.exports = router;
