const {
	createWorkSpace,
	findWorkSpaceById,
	findWorkSpaceByTitle,
	updateWorkSpaceData,
	removeWorkSpaceAccess
} = require("../controller/workSpace.controller");
// middleware for auth check
const { protect } = require("../middlewere/auth");

const router = require("express").Router();

router.post("/", protect,createWorkSpace);
router.get("/:id", protect,findWorkSpaceById);
router.post('/title',protect,findWorkSpaceByTitle)
router.put('/update/:id',protect,updateWorkSpaceData)
router.put('/remove/:id',protect,removeWorkSpaceAccess)

module.exports = router;
