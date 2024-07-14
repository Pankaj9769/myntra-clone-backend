const { mongoose } = require("mongoose");

const product_Schema = mongoose.Schema({
  id: {
    type: String,
  },
  category: {
    type: String,
  },
  type: {
    type: String,
  },
  image: [{ type: String }],
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  size: [{ type: String }],
  currPrice: {
    type: String,
  },
  orgPrice: {
    type: String,
  },
  discount: {
    type: String,
  },
  rating: {
    star: {
      type: String,
    },
    by: {
      type: String,
    },
  },
});

const productModel = mongoose.model("product", product_Schema);

module.exports = { productModel };
