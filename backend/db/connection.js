const mongoose = require("mongoose");
const { DATABASE_URI } = require("../secret");
const db = require("../constant");

const connectDB = async () => {
  try {
    await mongoose.connect(`${DATABASE_URI}/${db}`);
    console.log("Connected to database successfully");
  } catch (error) {
    console.error("Failed to connect to database", error);
  }
};

module.exports = connectDB;
