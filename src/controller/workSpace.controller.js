const Users = require("../models/User");
const WorkSpace = require("../models/WorkSpace");
const Marker = require("../models/Marker");
const updateUserWorkSpace = require("./utilFunctions/updateUserWorkspace");

// Create WorkSpace
// @POST REQUEST
const createWorkSpace = async (req, res, next) => {
	try {
		const loggedUser = req.loggedIdentity;

		const admin = req.loggedIdentity.id;

		const { title, description, workSpaceType, themeColor } = req.body;

		console.log(req.body);

		if (!title || !description || !workSpaceType) {
			res.statusCode = 400;
			throw new Error("Some Fields are missing");
		}

		const alreadyTitleExists = await WorkSpace.findOne({
			title: title,
			admin: admin,
		});
		if (alreadyTitleExists) {
			res.statusCode = 400;
			throw new Error("Workspace with similar title already exists");
		}

		const workSpace = new WorkSpace({
			title,
			description,
			workSpaceType,
			themeColor,
			admin,
			accesses: admin,
		});

		const savedWorkSpace = await workSpace.save();

		const workSpaceId = savedWorkSpace._id;

		const updatedUserData = await updateUserWorkSpace(admin, workSpaceId);

		console.log(updatedUserData);
		res.status(201).json({
			success: true,
			message: "Successfully Created",
			data: {
				id: savedWorkSpace._id,
				title: savedWorkSpace.title,
				description: savedWorkSpace.description,
				workspaceType: savedWorkSpace.workSpaceType,
				themeColor: savedWorkSpace.themeColor,
			},
		});
	} catch (e) {
		next(e);
	}
};

// find workspace details by id
//@desc: GET REQUEST
const findWorkSpaceById = async (req, res, next) => {
	try {
		const loggedUser = req.loggedIdentity;

		const workSpaceData = await WorkSpace.findOne({
			_id: req.params.id,
		}).populate([
			{
				path: "markers",
				select: ["-user", "-cards", "-workspace", "-__v", "-updatedAt"],
			},
		]);

		console.log(workSpaceData.accesses);

		if (!workSpaceData) {
			res.statusCode = 404;
			throw new Error("Workspace Not Found");
		}

		const checkForAccess = () => {
			const data = workSpaceData.accesses.filter((item) => {
				return String(item) == String(req.loggedIdentity.id);
			});
			return data.length != 0 ? true : false;
		};

		const result = await checkForAccess();
		if (!result) {
			res.statusCode = 401;
			throw new Error("User is Restricted From Access");
		}

		// console.log(workSpaceData);

		res.status(200).json({
			success: true,
			data: workSpaceData,
		});
	} catch (e) {
		next(e);
	}
};

// find workspace details by title
//@desc: POST REQUEST
const findWorkSpaceByTitle = async (req, res, next) => {
	try {
		const title = req.body.title;
		const workSpaceData = await WorkSpace.find({
			title: { $regex: title },
		});
		console.log(workSpaceData);
		if (!workSpaceData) {
			res.statusCode = 400;
			throw new Error("No Result Found");
		}
		res.status(200).json({
			success: true,
			data: workSpaceData,
		});
	} catch (e) {
		next(e);
	}
};

// update WorkSpace Details find by id
//@desc: PUT REQUEST
const updateWorkSpaceData = async (req, res, next) => {
	try {
		const { title, description, workSpaceType, themeColor, userID } =
			req.body;

		const workSpaceId = req.params.id;

		const workSpaceData = await WorkSpace.findOne({ _id: workSpaceId });

		if (!workSpaceData) {
			res.statusCode = 404;
			throw new Error("Workspace with that id does not exist");
		}

		console.log(workSpaceData.accesses);
		console.log("h" + req.loggedIdentity.id);
		const checkForAccess = () => {
			console.log("here");
			const data = workSpaceData.accesses.filter((item) => {
				return String(item) == String(req.loggedIdentity.id);
			});
			console.log(data.length);
			return data.length != 0 ? true : false;
		};

		const result = await checkForAccess();

		if (!result) {
			res.statusCode = 401;
			throw new Error("User is Unauthorised for Updation");
		}

		if (title) {
			console.log(title);
			const data = await WorkSpace.findOne({ title: title });
			if (data) {
				res.statusCode = 400;
				throw new Error("Workspace with same title already exists");
			}
		}

		// if a user that need to be given access has access already or not
		const checkForAccessExistence = (user) => {
			const data = workSpaceData.accesses.filter((item) => {
				return String(item) == String(user);
			});
			return data.length != 0 ? true : false;
		};

		workSpaceData.title = title || workSpaceData.title;
		workSpaceData.description = description || workSpaceData.description;
		workSpaceData.themeColor = themeColor || workSpaceData.themeColor;
		workSpaceData.workSpaceType =
			workSpaceType || workSpaceData.workSpaceType;

		if (userID) {
			const userData = await Users.findOne({ _id: userID });
			if (!userData) {
				res.statusCode = 404;
				throw new Error("User does not exist");
			}

			if (checkForAccessExistence(userID)) {
				res.statusCode = 400;
				throw new Error("User has already access");
			}

			// push accessData to workspace
			workSpaceData.accesses.push(userID);
			await updateUserWorkSpace(userID, workSpaceId);
		}

		const updatedWorkSpaceData = await workSpaceData.save();

		return res.status(201).json({
			success: true,
			data: updatedWorkSpaceData,
		});
	} catch (e) {
		next(e);
	}
};

// REMOVE WORKSPACE ACCESS
//@ PUT REQUEST
const removeWorkSpaceAccess = async (req, res, next) => {
	try {
		const workSpaceId = req.params.id;
		const { userId } = req.body;
		const workSpaceData = await WorkSpace.findOne({ _id: workSpaceId });

		const loggedUser = req.loggedIdentity;

		if (!workSpaceData) {
			res.statusCode = 404;
			throw new Error("Workspace with that id does not exist");
		}

		const checkForAccess = () => {
			const data = workSpaceData.accesses.filter((item) => {
				return item.user == String(req.loggedIdentity.id);
			});
			console.log(data.length);
			return data.length != 0 ? true : false;
		};

		if (!checkForAccess()) {
			res.statusCode = 401;
			throw new Error("User is Unauthorised for Updation");
		}

		if (checkForAccessExistence(userId, workSpaceData) == false) {
			res.statusCode = 400;
			throw new Error("User already has no access");
		}

		const user = await Users.findOne({ _id: userId });

		if (!user) {
			res.statusCode = 404;
			throw new Error("User does not exist");
		}

		const updatedUserAccessData = user.workSpaces.filter((item) => {
			return String(item) != String(workSpaceId);
		});

		user.workSpaces = updatedUserAccessData;
		const updatedUserData = await user.save();

		const updatedWorkSpaceAccessData = workSpaceData.accesses.filter(
			(item) => {
				return String(item) != String(userId);
			}
		);

		workSpaceData.accesses = updatedWorkSpaceAccessData;

		const updatedWorkSpaceData = await workSpaceData.save();

		res.status(200).json({
			success: true,
			message: "Access Removed",
			data: updatedWorkSpaceData,
		});
	} catch (e) {
		next(e);
	}
};

module.exports = {
	createWorkSpace,
	findWorkSpaceById,
	findWorkSpaceByTitle,
	updateWorkSpaceData,
	removeWorkSpaceAccess,
};
