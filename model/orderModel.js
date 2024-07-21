const { mongoose } = require("mongoose");
const { addressSchema } = require("./addressModel");
const orderSchema = mongoose.Schema({
  id: {
    type: String,
  },
  image: {
    type: String,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  address: addressSchema,
  date: {
    type: Date,
    default: Date.now,
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

module.exports = { orderSchema };
