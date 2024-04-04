const userModel = require("../models/user.model");

const getUser = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({
      message: "User found",
      users: users,
    });
  } catch (e) {
    console.log(e);
  }
};
module.exports = getUser;  
