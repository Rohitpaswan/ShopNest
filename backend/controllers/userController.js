const createHttpError = require("http-errors");
const userModel = require("../models/user.model");
const { successResponse, errorResponse } = require("./responseController");
const { default: mongoose } = require("mongoose");

const getUsers = async (req, res) => {
  try {
    //search
    const search = req.query.search || "";
    const searchRegx = new RegExp(search, "i"); //searching attribute in db
    const filter = {
      // isAdmin: { $ne: true }, //return only non-admin users
      $or: [
        { name: { $regex: searchRegx } },
        { email: { $regex: searchRegx } },
        { phone: { $regex: searchRegx } },
      ],
    };

    //pagination
    const pages = req.query.pages * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (pages - 1) * limit;

    const count = await userModel.find(filter).countDocuments();
    const users = await userModel.find(filter).skip(skip).limit(limit);

    const pagiantion = {
      totalPages: Math.ceil(count / limit),
      currentPage: pages,
      perviousPage: pages - 1 > 0 ? pages - 1 : null,
      nextPage: pages + 1 <= Math.ceil(count / limit) ? pages + 1 : null,
    };
    if (!users) {
      errorResponse(res, { statusCode: 404, message: "User Not Found" });
    }

    successResponse(
      res,
      { statusCode: 200, message: "Users return sucuffuly" },
      { users: users, pagiantion: pagiantion }
    );
  } catch (e) {
    console.log(e);
  }
};

//find users by id
const getUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const options = { password: 0 };
    const user = await userModel.findById(userId, options);
    if (!user) errorResponse(res, { statusCode: 404, message: "user not found" });
    successResponse(
      res,
      {
        statusCode: 200,
        message: "User returned successfully",
      },
      user
    );
  } 
  catch (error) {
    if (error instanceof mongoose.Error) {
      res.status(400).json({
        message: "Invalid userId",
      });
    }
    console.log("error", error.message);
  }
};

module.exports = { getUsers, getUser };
