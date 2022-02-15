const Marker = require("../models/Marker");
const WorkSpace = require("../models/WorkSpace");

const createMarker = async (req, res, next) => {
	try {
		const loggedUser = req.loggedIdentity;
		const { title, description, themeColor, coverImg, workspaceId } =
			req.body;
		if (!title || !workspaceId) {
			req.statusCode = 400;
			throw new Error("Fields missing");
		}
		const workspace = await WorkSpace.findById(workspaceId);
		if (!workspace) {
			req.statusCode = 404;
			throw new Error("No such workspace available");
		}

		const existingMarker = await Marker.findOne({
			title,
			workspace: workspaceId,
		});
		if (existingMarker) {
			res.statusCode = 400;
			throw new Error("Marker with same name in this workspace exists");
		}

		let isValid = false;
		const accesses = workspace.accesses;
		accesses.forEach((access) => {
			if (String(access) === String(loggedUser.id)) isValid = true;
		});
		if (!isValid) {
			req.statusCode = 403;
			throw new Error("You are not accessed to this workspace");
		}

		const marker = new Marker({
			title,
			description,
			themeColor,
			coverImg,
			workspace: workspaceId,
			user: loggedUser.id,
		});

		const savedMarker = await marker.save();

		if (savedMarker) {
			const markers = [...workspace.markers, savedMarker.id];
			workspace.markers = markers;
			await workspace.save();
		}

		console.log(savedMarker);

		res.status(201).send({
			success: true,
			data: savedMarker,
		});
	} catch (e) {
		next(e);
	}
};

const findOneMarker = async (req, res, next) => {
	try {
		const { id } = req.params;
		const loggedUser = req.loggedIdentity;
		const marker = await Marker.findById(id)
			.populate([
				{
					path: "workspace",
					select: [
						"-markers",
						"-__v",
						"-createdAt",
						"-updatedAt",
						"-admin",
					],
				},
			])
			.select(["-__v"]);
		if (!marker) {
			res.statusCode = 404;
			throw new Error("No such marker found");
		}
		let isValid = false;
		if (marker.workspace && marker.workspace.accesses) {
			marker.workspace.accesses.forEach((id) => {
				if (String(id) === String(loggedUser._id)) isValid = true;
			});
		}
		if (!isValid) {
			res.statusCode = 403;
			throw new Error("You are not accessed to this workspace");
		}
		res.status(200).send({
			success: true,
			data: marker,
		});
	} catch (e) {
		next(e);
	}
};

const findMarker = async (req, res, next) => {
	try {
		const query = req.query;
		const loggedUser = req.loggedIdentity;
		const markers = await Marker.find(query)
			.populate({
				path: "workspace",
				select: [
					"-markers",
					"-__v",
					"-createdAt",
					"-updatedAt",
					"-admin",
				],
			})
			.select(["-__v"]);

		const shortMarkers = markers.filter((marker) => {
			if (marker.workspace && marker.workspace.accesses) {
				let isValid = false;
				marker.workspace.accesses.forEach((id) => {
					if (String(id) === String(loggedUser._id)) {
						isValid = true;
					}
				});
				if (isValid) {
					return marker;
				}
			}
		});
		res.status(200).send({
			success: true,
			data: shortMarkers,
		});
	} catch (e) {
		next(e);
	}
};

const updateMarker = async (req, res, next) => {
	try {
	} catch (e) {
		next(e);
	}
};

module.exports = { createMarker, findOneMarker, findMarker, updateMarker };
