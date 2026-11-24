const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  shortDescription: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
    min: 0,
  },

  weight: {
    type: String,
    default: "100g",
  },

  image: {
    type: String,
    default: "",
  },

  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },

  featured: {
    type: Boolean,
    default: false,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
