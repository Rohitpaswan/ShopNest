const createHttpError = require("http-errors");
const userModel = require("../models/user.model");
const { successResponse, errorResponse } = require("./responseController");
const { default: mongoose } = require("mongoose");
const generateToken = require("../helper/generateToken");
const { secretKey, client_url, smptUsername } = require("../secret");
const sendEmailWithNodemailer = require("../helper/email");
const jwt = require("jsonwebtoken");

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
  const { email, password, name, phoneNumber, address } = req.body;
  const newUser = { email, password, name, phoneNumber, address };

  try {
    const userExists = await userModel.exists({ email }); // Simplified, as key and value are the same

    if (userExists) {
      return errorResponse(res, {
        statusCode: 409,
        message: "User already exists",
      });
    } else {
      const token = generateToken(newUser, secretKey, "10m");
      console.log("server", token);

      // Prepare email
      const emailData = {
        from: "ShopNest  <shopnext727@gmail.com>", // Fixed typo
        to: email,
        subject: "Please Verify your email address", // Corrected typo
        html:
          `<h2>Hello ${name}!</h2>` +
          `<p>Click on the link for activation: <a href="${client_url}/api/user/activation/${token}">Activation Link</a>.</p>`,
      };

      try {
        const info = await sendEmailWithNodemailer(emailData); // Wait for the email sending to finish
        return successResponse(
          res,
          { statusCode: 200, message: "User Registration Success" },
          { token: token }
        );
      } catch (error) {
        return errorResponse({ message: error.message });
      }
    }
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error during registration:", error);
    return errorResponse(res, {
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

//user-Verification

const activeUserAccount = async (req, res, next) => {
  const { token } = req.body;
  if (!token)
    return errorResponse({ statusCode: 404, message: "token not found" });
  console.log("clinent", token);

  try {
    //get token from body

    //varify token
    const decode = jwt.verify(token, secretKey);
    console.log(decode);
    if (!decode) {
      return res.status(404).send({ message: "User couldn't be verified" });
    }
    //store data in db
    const data = await userModel.create(decode);
    console.log(data);
    console.log(decode);
    return res.status(200).send({ message: "success" });
  } catch (error) {
    console.error("Activation Failed", error.name);
    return res.status(500).send({ error });
  }
};

module.exports = {
  getUser,
  getUsers,
  deleteUser,
  processRegister,
  activeUserAccount,
};
