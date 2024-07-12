const { productModel } = require("../model/productModel");
const addProduct = async (req, res) => {
  const prods = req.body;

  try {
    for (const prod of prods) {
      const response = await productModel.create(prod);
      if (response.ok) {
        console.log("added");
      }
    }
    // res.json({ msg: "done" });
    res.status(200).json({ message: "Products added successfully" });
  } catch (error) {
    console.error("Error adding products:", error);
    res.status(500).json({ error });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

module.exports = { addProduct, getAllProduct };
