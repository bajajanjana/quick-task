const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const Schema = mongoose.Schema;

const CardSchema = new Schema(
	{
		title: {
			type: String,
		},
		description: {
			type: String,
		},
		coverImg: {
			type: String,
		},
		order: {
			type: Number,
		},
		themeColor: {
			type: String,
			default: "#fff",
		},
		attachments: [
			{
				filename: { type: String },
				filepath: { type: String },
			},
		],
		startDate: {
			type: Date,
		},
		dueDate: {
			type: Date,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		members: [
			{
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				ref: "User",
			},
		],
		// chat: [
		// 	{
		// 		user: {
		// 			type: mongoose.Schema.Types.ObjectId,
		// 			ref: "User",
		// 		},
		// 		msg: {
		// 			type: String,
		// 		},
		// 		time: {
		// 			type: Date,
		// 		},
		// 		tags: [
		// 			{
		// 				userid: {
		// 					type: String,
		// 				},
		// 			},
		// 		],
		// 	},
		// ],
	},
	{
		timestamps: true,
	}
);

// CardSchema.plugin(autoIncrement.plugin, {
// 	model: "Card",
// 	field: "order",
// 	startAt: 1,
// 	incrementBy: 1,
// });

const Card = mongoose.model("Card", CardSchema);

module.exports = Card;
