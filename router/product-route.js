const express = require("express");
const {
  addProduct,
  getAllProduct,
} = require("../controller/product-controller");

const productRouter = express.Router();

productRouter.route("/add").post(addProduct);
productRouter.route("/").get(getAllProduct);

module.exports = { productRouter };
