const createHttpError = require("http-errors");
const userModel = require("../models/user.model");
const { successResponse, errorResponse } = require("./responseController");
const { default: mongoose } = require("mongoose");
const generateToken = require("../helper/generateToken");
const { secretKey } = require("../secret");

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
    if (!user)
      errorResponse(res, { statusCode: 404, message: "user not found" });
    successResponse(
      res,
      {
        statusCode: 200,
        message: "User returned successfully",
      },
      user
    );
  } catch (error) {
    if (error instanceof mongoose.Error) {
      return res.status(400).json({
        message: "Invalid userId",
      });
    }
  }
};

//delete user from db
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const option = { password: 0 };
    const user = await userModel.findById(userId, option);
    if (!user) {
      errorResponse(res, 404, "User not found");
    } else {
      //delete user from db
      await userModel.deleteOne({ _id: userId });
      return res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (error) {
    //if mongoose error occured
    if (error instanceof mongoose.Error) {
      return res.status(400).json({
        message: "Invalid userId",
      });
    }
    console.log(error.message);
  }
};

//User registation 
const processRegister = async (req, res) => {
  const { email, password, name, phone, address } = req.body;
  const newUser = { email, password, name, phone, address }; 
  const userExists = await userModel.exists({ email: email }); //checking if user exists

  if (userExists) {
    return errorResponse(res, {
      statusCode: 409,
      message: "User already exists",
    });
  } else {
    console.log(typeof(secretKey))
    const token = generateToken(newUser, secretKey, "10m");
    return successResponse(
      res,
      { statusCode: 200, message: "User Registration Success" },
      { token: token }
    );
  }
};

module.exports = { getUser, getUsers, deleteUser, processRegister };
