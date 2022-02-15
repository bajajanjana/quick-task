const redis = require("redis");

// const REDIS_PORT = "http://127.0.0.1:6379";

const REDIS_PORT = {
	host: process.env.REDIS_HOST,
	port: process.env.REDIS_PORT,
	password: process.env.REDIS_PASSWORD,
};

const activateRedis = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const redisClient = redis.createClient(REDIS_PORT);
			await redisClient.connect();
			resolve(process.env.REDIS_PORT);
		} catch (e) {
			reject(e);
		}
	});
};
module.exports = { activateRedis };
