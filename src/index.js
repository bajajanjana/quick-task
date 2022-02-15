const express = require("express");
const morgan = require("morgan");
require("colors");
require("dotenv").config({ path: "./dev.env" });
require("log-timestamp");

const cors = require("cors");
const { connectDB } = require("./db/database");
const { activateAPI } = require("./api/api");
const { errorHandler } = require("./middlewere/errorHandler");
const { activateRedis } = require("./redis/redisServer");

const PORT = process.env.PORT || 5020;
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

connectDB()
	.then((conn) => {
		console.log(
			`Database connected on port ${conn.connection.port}`.cyan.bold
		);

		app.get("/", (req, res) => {
			res.send({
				message: `Server running on port ${PORT}`,
			});
		});
		// activateRedis()
		// 	.then((port) => {
		// 		console.log(`Redis connected on port ${port}`.magenta.bold);
		// 	})
		// 	.catch((e) => {
		// 		console.log(`Error while connecting redis : ${e}`.red);
		// 		process.exit(0);
		// 	});
		app.use("/api", activateAPI());
		app.use(errorHandler);
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`.yellow.bold);
		});
	})
	.catch((e) => {
		console.log(`Error while connecting data base : ${e}`.red);
		process.exit(0);
	});
