const mongoose = require("mongoose");

const connection = async () => {
  const response = await mongoose.connect(process.env.URI);
  if (response) console.log("Connection Successfull");
};

module.exports = { connection };
