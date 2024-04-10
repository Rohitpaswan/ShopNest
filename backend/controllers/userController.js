const createHttpError = require("http-errors");
const userModel = require("../models/user.model");
const { successResponse } = require("./responseController");

const getUsers = async (req, res) => {
  try {
    //search
    const search = req.query.search || "";
    const searchRegx = new RegExp(".*" + search + ".*", "i"); //searching attribute in db
    const filter = {
      isAdmin: { $ne: true }, //return only non-admin users
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
    console.log(limit, skip);
    const count = await userModel.find(filter).countDocuments();
    const users = await userModel.find(filter).skip(skip).limit(limit);
    

    const pagiantion = {
      totalPages: Math.ceil(count / limit),
      currentPage: pages,
      perviousPage: pages - 1 > 0 ? pages - 1 : null,
      nextPage: pages + 1 <= Math.ceil(count / limit) ? pages + 1 : null,
    };
    if(!users) throw createError(404 , "No users found");
    //**calling function  */
    successResponse(
      res,
      { statusCode: 200, message: "Users return sucuffuly" },
      { users: users, pagiantion: pagiantion }
    );
  } catch (e) {
    console.log(e);

  }
};

const getUser = (req, res) => {
};




module.exports ={ getUsers ,getUser};
