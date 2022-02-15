const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const Schema = mongoose.Schema;

const MarkerSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		themeColor: {
			type: String,
			default: "#fff",
		},
		order: {
			type: Number,
		},
		coverImg: {
			type: String,
			default:
				"https://res.cloudinary.com/abhistrike/image/upload/v1626953029/avatar-370-456322_wdwimj.png",
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		workspace: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "WorkSpace",
		},
		cards: [
			{
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				ref: "Card",
			},
		],
	},
	{
		timestamps: true,
	}
);

// MarkerSchema.plugin(autoIncrement.plugin, {
// 	model: "Marker",
// 	field: "order",
// 	startAt: 1,
// 	incrementBy: 1,
// });

const Marker = mongoose.model("Marker", MarkerSchema);

module.exports = Marker;
