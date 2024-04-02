const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const { defaultImgPath } = require("../secret");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minLength: [3, "Minimum length should be 3 characters"],
      maxLength: [31, "Maximum length exceeded"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      unique: [true, "Email is already in use"],
      trim: true,
      minLength: [3, "Minimum length should be 3 characters"],
      maxLength: [31, "Maximum length exceeded"],
      validate: {
        validator: (v) => {
          const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          return pattern.test(v);
        },
        message: "Please enter a valid email address",
      },
    },

    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      unique: [true, "Phone number is already in use"],
      trim: true,
      maxLength: [10, "Maximum length exceeded"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
      minLength: [6, "Minimum length should be 6 characters"],
      maxLength: [10, "Maximum length exceeded"],
      set: (v) => {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(v, salt);
      },
    },

    image: {
      type: String,
      default: defaultImgPath,
    },

    address: {
      type: String,
      required: [true, "Address is required"],
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
