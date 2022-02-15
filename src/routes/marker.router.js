const {
	createMarker,
	findOneMarker,
	findMarker,
	updateMarker,
} = require("../controller/marker.controller");
const { protect } = require("../middlewere/auth");

const router = require("express").Router();

router.route("/").post(protect, createMarker);
router.route("/:id").get(protect, findOneMarker);
router.route("/").get(protect, findMarker);
router.route("/").put(protect, updateMarker);

module.exports = router;
