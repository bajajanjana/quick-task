const Users = require("../models/User");
const generateToken = require("../utilityFunction/generateToken");

const registerUser = async (req, res, next) => {
	try {
		const { name, email, password, confirmPassword } = req.body;

		if (!name || !email || !password || !confirmPassword) {
			res.statusCode = 400;
			throw new Error("Field missing");
		}

		if (password !== confirmPassword) {
			res.statusCode = 400;
			throw new Error("Password do not match");
		}

		const alreadyUser = await Users.findOne({ email: email });
		if (alreadyUser) {
			res.statusCode = 400;
			throw new Error("User already exist");
		}

		const user = new Users({
			name,
			email,
			password,
		});

		const savedUser = await user.save();
		res.status(201).send({
			success: true,
			data: {
				_id: savedUser._id,
				name: savedUser.name,
				email: savedUser.email,
				avatar: savedUser.avatar,
			},
		});
	} catch (e) {
		next(e);
	}
};

const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			res.statusCode = 400;
			throw new Error("Field missing");
		}
		const user = await Users.findOne({ email }).select([
			"-workSpaces",
			"-cards",
		]);
		if (!user) {
			res.statusCode = 404;
			throw new Error("No such user found");
		}
		if (!user || !(await user.matchPassword(password))) {
			res.statusCode = 400;
			throw new Error("Wrong password");
		}
		const token = generateToken(user._id);
		const tokensArray = [...user.tokens, token];
		user.tokens = tokensArray;
		await user.save();

		res.status(201).send({
			success: true,
			data: {
				_id: user._id,
				name: user.name,
				email: user.email,
				token: token,
				avatar: user.avatar,
				workSpaces: user.workSpaces,
				cards: user.cards,
			},
		});
	} catch (e) {
		next(e);
	}
};

const findOne = async (req, res, next) => {
	try {
		const loggedUser = req.loggedIdentity;
		const user = await Users.findById(loggedUser.id)
			.populate([
				{
					path: "workSpaces",
					select: ["-markers", "-updatedAt", "-__v", "-admin"],
				},
			])
			.select(["-password", "-tokens", "-__v"]);
		if (!user) {
			res.statusCode = 404;
			throw new Error("No such user found");
		}
		res.status(201).send({
			success: true,
			data: user,
		});
	} catch (e) {
		next(e);
	}
};

const logout = async (req, res, next) => {
	try {
		const loggedUser = req.loggedIdentity;
		const user = await Users.findById(loggedUser.id);
		const currentToken = req.currentToken;
		const currentTokens = user.tokens.filter((token) => {
			if (token !== currentToken) return token;
		});
		console.log(currentToken);
		console.log(currentTokens);
		user.tokens = currentTokens;
		await user.save();
		return res.status(201).send({
			success: true,
			message: "Successfully logged out",
		});
	} catch (e) {
		next(e);
	}
};

module.exports = { login, registerUser, logout, findOne };
