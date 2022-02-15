const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkSpaceSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			max: [30, "Must be less than 30 characters"],
		},
		description: {
			type: String,
			default: "This is a workspace to manage your project",
		},
		workSpaceType: {
			type: String,
			required: true,
			default: "kanban",
		},
		themeColor: {
			type: String,
			default: "#fff",
		},
		admin: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		markers: [
			{
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				ref: "Marker",
			},
		],
		accesses: [
			{
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				ref: "User",
			},
		],
	},
	{
		timestamps: true,
	}
);

const WorkSpace = mongoose.model("WorkSpace", WorkSpaceSchema);

module.exports = WorkSpace;
