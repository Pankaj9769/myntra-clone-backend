const mongoose = require("mongoose");

const addressSchema = mongoose.Schema(
  {
    street: {
      type: String,
    },
    locality: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zip: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = { addressSchema };
