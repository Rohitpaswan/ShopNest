const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: true["Category name is required"],
      minlength: [2, "Category name must be at least 2 characters long"],
      maxlength: [50, "Category name cannot exceed 50 characters"],
    },
    slug: {
      type: String,
      require: true["Slug is required"],
      lowercase: true,
    },
  },
  { timestamps: true }
);
module.exports = model("category" , categorySchema);