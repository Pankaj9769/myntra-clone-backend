const express = require("express");
const {
  addProduct,
  getAllProduct,
  removeAll,
} = require("../controller/product-controller");

const productRouter = express.Router();

productRouter.route("/add").post(addProduct);
productRouter.route("/").get(getAllProduct);
productRouter.route("/remove").get(removeAll);

module.exports = { productRouter };
