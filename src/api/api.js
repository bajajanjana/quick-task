const router = require("express").Router();
const userApi = require("../routes/user.router");
const workSpaceApi = require("../routes/workSpace.router");
const markerApi = require("../routes/marker.router");
const activateAPI = () => {
	router.use("/user", userApi);
	router.use("/workspace", workSpaceApi);
	router.use("/marker", markerApi);
	return router;
};

module.exports = { activateAPI };
