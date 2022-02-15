const jwt = require("jsonwebtoken");
const Users = require("../models/User");

const protect = async (req, res, next) => {
	let token;
	try {
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith("Bearer")
		) {
			token = req.headers.authorization.split(" ")[1];
			if (!token) {
				res.statusCode = 401;
				throw new Error("Not Authorised");
			}
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			const user = await Users.findById(decoded.id).select("-password");
			if (!user) {
				res.statusCode = 401;
				throw new Error("Not Authorised");
			}
			req.loggedIdentity = user;
			const tokens = req.loggedIdentity.tokens;
			if (!tokens.includes(token)) {
				res.statusCode = 401;
				throw new Error("Token expired");
			}
			req.currentToken = token;
			next();
		} else {
			res.statusCode = 401;
			throw new Error("Not Authorised");
		}
	} catch (e) {
		next(e);
	}
};

module.exports = { protect };
