const mongoose = require("mongoose");
require("dotenv").config({ path: "./dev.env" });

const MONGODBURI = process.env.MONGODBURI;

const connectDB = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const conn = await mongoose.connect(MONGODBURI, {
				useUnifiedTopology: true,
				useNewUrlParser: true,
			});
			resolve(conn);
		} catch (e) {
			reject(e);
		}
	});
};

module.exports = { connectDB };
