const Users = require("../../models/User");

const updateUserWorkSpace = (admin, workSpaceId) => {
	return new Promise(async (resolve, reject) => {
		try {
			console.log("function called" + workSpaceId);
			const userData = await Users.findOne({ _id: admin });
			if (!userData) throw new Error("User could not be retrived");
			console.log(userData)
			userData.workSpaces.push(workSpaceId);
			const updatedUserData = await userData.save();
			if (!updatedUserData) throw new Error("Some Error Occured");
			resolve(updatedUserData);
		} catch (e) {
			reject(e);
		}
	});
};

module.exports = updateUserWorkSpace;
