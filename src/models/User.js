const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userModel = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		workSpaces: [
			{
				type: mongoose.Schema.Types.ObjectId,
				required: true,
		        ref: "WorkSpace",
			},
		],
		cards: [
			{
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				ref: "Card",
			},
		],
		avatar: {
			type: String,
			default:
				"https://res.cloudinary.com/abhistrike/image/upload/v1626953029/avatar-370-456322_wdwimj.png",
		},
		tokens: [
			{
				type: String,
			},
		],
	},
	{
		timestamps: true,
	}
);

userModel.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

userModel.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

const Users = mongoose.model("Users", userModel);
module.exports = Users;
