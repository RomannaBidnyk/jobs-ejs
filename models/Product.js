const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      minlength: 3,
      maxlength: 50,
    },
    price: {
      type: Number,
      required: [true, "Please provide price"],
      minlength: 3,
      maxlength: 50,
    },
    availability: {
      type: String,
      enum: ["inStock", "outOfStock"],
      default: "outOfStock",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
